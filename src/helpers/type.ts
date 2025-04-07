export interface Discussion {
  id: number;
  author: string;
  title: string;
  body: string;
  statement_count: number;
  vote_count: number;
  created: number;
  statements?: Statement[];
}

export interface Statement {
  id: number;
  author: string;
  discussion: number;
  body: string;
  vote_count: number;
  scores_1: number;
  scores_2: number;
  scores_3: number;
  created: number;
}

export interface Vote {
  id: string;
  voter: string;
  discussion: number;
  statement: number;
  choice: number;
  created: number;
}
