import { gql } from "graphql-request";

export const getGeneratedTextQuery = gql`
  query Query($contextText: String!) {
    getGeneratedText(contextText: $contextText)
  }
`;
