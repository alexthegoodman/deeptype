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
        media {
          url
          type
        }
        url
      }
    }
  }
`;
