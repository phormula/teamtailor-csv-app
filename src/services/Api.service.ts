import { format } from 'date-fns';
import { objectToQueryParams } from '../helpers';
import { CandidateData } from '../types/candidate.type';
import { JsonApiResponse } from '../types/response';

export const fetchAllCandidates = async () => {
  const API_KEY = process.env.TEAMTAILOR_API_KEY;
  const API_VERSION = process.env.TEAMTAILOR_API_VERSION;
  const BASE_URL = process.env.TEAMTAILOR_BASE_URL;

  const params = {
    include: 'job-applications',
    'fields[candidates]': 'id,first-name,last-name,email,job-applications',
    'fields[job-applications]': 'id,created-at',
    'page[size]': '30',
  };
  const headers = {
    Authorization: `Token token=${API_KEY}`,
    Accept: 'application/vnd.api+json',
    'X-Api-Version': API_VERSION || '',
  };

  let candidates: JsonApiResponse[] = [];
  let nextPage: string | null = `${BASE_URL}/candidates?${objectToQueryParams(params)}`;

  while (nextPage) {
    const response = await fetch(nextPage, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}: ${response.statusText}`);
    }

    const data: JsonApiResponse = await response.json();
    candidates = [...candidates, data];
    nextPage = data.links.next || null;
  }

  return candidates;
};

export const processCandidateData = (data: JsonApiResponse): CandidateData[] => {
  const candidates = data.data;
  const included = data.included;

  const jobApplicationsMap = {};
  included?.forEach((item) => {
    if (item.type === 'job-applications') {
      jobApplicationsMap[item.id] = item.attributes;
    }
  });

  const enrichedCandidates = candidates.map((candidate) => {
    const applications = candidate.relationships['job-applications'].data.map((app) => ({
      id: app.id,
      created_at: jobApplicationsMap[app.id]?.['created-at'] || 'N/A',
    }));

    return {
      candidate_id: candidate.id,
      first_name: candidate.attributes['first-name'],
      last_name: candidate.attributes['last-name'],
      email: candidate.attributes.email,
      job_applications: applications,
    };
  });

  return enrichedCandidates.flatMap((candidate) =>
    candidate.job_applications.map((app) => ({
      candidate_id: candidate.candidate_id,
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      email: candidate.email,
      job_application_id: app.id,
      job_application_created_at: format(app.created_at, 'yyyy-MM-dd HH:mm:ss XXX'),
    })),
  );
};
