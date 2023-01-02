export interface PageResult {
  topicClassification: {
    name: string;
  };
  summary: string;
  url: string;
  media: {
    url: string;
    type: string;
  }[]
}

export interface ResultData {
  contextKeywords: string[];
  keywords: string[];
  results: PageResult[];
}
