import { format } from 'date-fns';
import { objectToQueryParams } from '../helpers';
import { CandidateData } from '../types/candidate.type';
import { JsonApiResponse } from '../types/response';

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

export const fetchAllCandidates = async () => {
  const API_KEY = process.env.TEAMTAILOR_API_KEY;
  const API_VERSION = process.env.TEAMTAILOR_API_VERSION;
  const BASE_URL = process.env.TEAMTAILOR_BASE_URL;

  const params = {
    include: 'job-applications',
    'fields[candidates]': 'id,first-name,last-name,email,job-applications',
    'fields[job-applications]': 'id,created-at',
    'page[size]': 30,
  };

  const headers = {
    Authorization: `Token token=${API_KEY}`,
    Accept: 'application/vnd.api+json',
    'X-Api-Version': API_VERSION || '',
  };

  try {
    const firstPageResponse = await fetch(`${BASE_URL}/candidates?${objectToQueryParams(params)}`, { headers });
    if (!firstPageResponse.ok) {
      throw new Error(`Error fetching first page: ${firstPageResponse.status}`);
    }

    const firstPageData: JsonApiResponse = await firstPageResponse.json();
    const totalPages = firstPageData.meta['page-count'];
    const remainingPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(1);

    const fetchPage = async (page: number) => {
      const url = `${BASE_URL}/candidates?${objectToQueryParams({ ...params, 'page[number]': page })}`;
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`Error fetching page ${page}: ${response.status}`);
      }
      return await response.json();
    };

    const remainingPages = await Promise.all(remainingPageNumbers.map((page) => fetchPage(page)));

    const allData: JsonApiResponse[] = [firstPageData, ...remainingPages];

    return allData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
