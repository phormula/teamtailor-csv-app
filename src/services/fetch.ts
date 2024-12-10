import type { Options } from '../types/response.type';

async function raiseHTTPException(response: Response): Promise<any> {
  const body = await response.json();

  if (!response.ok) {
    throw { status: response.status, statusText: response.statusText, message: body.message };
  }

  return body;
}

function objectToQueryParams(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else {
        params.set(key, value);
      }
    }
  }

  return params.toString();
}

async function makeRequest(
  resource: string,
  method: string,
  { body, queryParams: params, headers, options }: Options,
): Promise<any> {
  const query = params && Object.keys(params).length ? '?' + objectToQueryParams(params) : '';
  const TEAMTAILOR_API_KEY = process.env.TEAMTAILOR_API_KEY;
  const TEAMTAILOR_BASE_URL = process.env.TEAMTAILOR_BASE_URL;
  const url = `${TEAMTAILOR_BASE_URL}/${resource}${query}`;

  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/vnd.api+json',
      ...headers,
      Authorization: `Token token=${TEAMTAILOR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });

  return raiseHTTPException(response);
}

export async function get(
  resource: string,
  queryParams: Record<string, any> = {},
  headers: Record<string, string> = {},
  options: RequestInit = {},
): Promise<any> {
  return await makeRequest(resource, 'GET', { queryParams, headers, options });
}

export async function post(
  resource: string,
  body: FormData,
  headers: Record<string, string> = {},
  options: RequestInit = {},
): Promise<any> {
  return await makeRequest(resource, 'POST', { body, headers, options });
}

export async function put(
  resource: string,
  body: any = {},
  headers: Record<string, string> = {},
  options: RequestInit = {},
): Promise<any> {
  return await makeRequest(resource, 'PUT', { body, headers, options });
}

export async function del(
  resource: string,
  headers: Record<string, string> = {},
  options: RequestInit = {},
): Promise<any> {
  return await makeRequest(resource, 'DELETE', { headers, options });
}
