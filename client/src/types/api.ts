export interface Option {
  keyword?: string;
  writerId?: string;
  languages?: string[];
  cursor?: string; // 반환된 마지막 post의 _id
  size: number;
}

export interface Language {
  _id: string;
  name: string;
}
