/*
Represents external structure data type
 */
export interface ExternalResource {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ExternalData[];
  support: ExternalSupport;
}

export interface ExternalSupport {
  url: string;
  text: string;
}

export interface ExternalData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}