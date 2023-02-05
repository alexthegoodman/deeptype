import { gql } from "graphql-request";

export const searchQuery = gql`
  query SearchQuery(
    $topicClassificationSlug: String
    $contextQuery: String!
    $query: String!
  ) {
    search(
      topicClassificationSlug: $topicClassificationSlug
      query: $query
      contextQuery: $contextQuery
    ) {
      contextKeywords
      keywords

      results {
        metaTitle
        metaDescription
        excerpt
        summary
        loadSpeedScore
        topicScore
        topicClassification {
          name
        }
        url
      }
    }
  }
`;

export const baseSearchQuery = gql`
  query BaseSearch($query: String!) {
    baseSearch(query: $query) {
      id
      url
      metaTitle
      metaDescription
      headline
      excerpt
      summary
      loadSpeedScore

      outgoingLinks {
        id
        originUrl
        targetUrl
        count
        analyzedDate
        updatedAt
        createdAt
      }
    }
  }
`;
