export interface PageResult {
  topicClassification: {
    name: string;
  };
  summary: string;
  url: string;
}

export interface ResultData {
  contextKeywords: string[];
  keywords: string[];
  results: PageResult[];
}
