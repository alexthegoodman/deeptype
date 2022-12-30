import { gql } from "graphql-request";

export const newDocumentMutation = gql`
  mutation NewDocumentMutation {
    newDocument {
      id
    }
  }
`;
