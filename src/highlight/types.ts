export interface Storage {
  agent: string;
  key: string;
  value?: any;
}

export interface DeleteStorage {
  agent: string;
  key: string;
}

export interface Event {
  id?: number;
  agent: string;
  key: string;
  data: Record<string, any>;
}
