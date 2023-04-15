import { gql } from "graphql-request";

export const newDocumentMutation = gql`
  mutation NewDocumentMutation($preset: String!) {
    newDocument(preset: $preset) {
      id
    }
  }
`;

export const updateDocumentMutation = gql`
  mutation UpdateDocument(
    $documentId: String!
    $title: String
    $descriptor: String
    $content: String
  ) {
    updateDocument(
      documentId: $documentId
      title: $title
      descriptor: $descriptor
      content: $content
    ) {
      id
    }
  }
`;

export const myDocumentsQuery = gql`
  query Documents {
    myDocuments {
      id
      title
      preset

      creator {
        email
        role
      }

      updatedAt
      createdAt
    }
  }
`;

export const documentQuery = gql`
  query Document($documentId: String!) {
    document(documentId: $documentId) {
      id
      title
      content
      descriptor
      preset

      creator {
        email
        role
      }

      savedItems {
        id
        type
        data
        updatedAt
        createdAt
      }

      updatedAt
      createdAt
    }
  }
`;

export const saveItemMutation = gql`
  mutation SaveItemMutation(
    $type: String!
    $data: String!
    $documentId: String!
  ) {
    addSavedItem(type: $type, data: $data, documentId: $documentId) {
      id
    }
  }
`;
