import type { IScore } from ".";

export interface IScoreSearchParams {
  id?: string;
  product?: string;
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  scoreMoreThan?: number;
}

export interface IScoreSearchResult {
  scores: IScore[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  fromto: [number, number];
}
