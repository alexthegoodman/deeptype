import { gql } from "graphql-request";

export const newDocumentMutation = gql`
  mutation NewDocumentMutation {
    newDocument {
      id
    }
  }
`;

export const myDocumentsQuery = gql`
  query Documents {
    myDocuments {
      id
      title

      creator {
        email
        role
      }

      updatedAt
      createdAt
    }
  }
`;
