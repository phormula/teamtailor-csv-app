export interface JsonApiResponse {
  data: Candidate[];
  included?: JobApplication[];
  meta: Meta;
  links: Links;
}

interface Candidate {
  id: string;
  type: string;
  attributes: {
    'first-name': string;
    'last-name': string;
    email: string;
  };
  relationships: {
    'job-applications': {
      data: JobApplicationReference[];
    };
  };
}

interface JobApplicationReference {
  id: string;
  type: string;
}

interface JobApplication {
  id: string;
  type: string;
  attributes: {
    'created-at': string;
  };
}

interface Links {
  first: string;
  prev?: string;
  next?: string;
  last: string;
}

interface Meta {
  'record-count': number;
  'page-count': number;
}
