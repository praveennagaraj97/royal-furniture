export interface APIErrorResponse {
  [field: string]: string[] | string;
}

export interface ParsedAPIError {
  fieldErrors: Record<string, string>;
  generalError?: string;
}

