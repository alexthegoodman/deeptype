import { gql } from "graphql-request";

export const getCurrentUserQuery = gql`
  query GetCurrentUser {
    getCurrentUser {
      email
      role
      subscription
      frequency
      documentTree
      updatedAt
      createdAt
    }
  }
`;

export const updateUserMutation = gql`
  mutation UpdateUser($documentTree: String) {
    updateUser(documentTree: $documentTree) {
      email
      role
      subscription
      frequency
      documentTree
      updatedAt
      createdAt
    }
  }
`;

export const authenticateQuery = gql`
  query AuthenticateUser {
    authenticate
  }
`;

export const registerMutation = gql`
  mutation RegisterUser {
    registerUser
  }
`;

export const newCheckoutMutation = gql`
  mutation NewCheckout($frequency: String!) {
    newCheckout(frequency: $frequency)
  }
`;

export const confirmSubscriptionMutation = gql`
  mutation ConfirmSubscription($sessionId: String!, $token: String!) {
    confirmSubscription(sessionId: $sessionId, token: $token) {
      subscription
      frequency
    }
  }
`;

export const confirmFreemiumMutation = gql`
  mutation ConfirmFreemium {
    confirmFreemium {
      updatedAt
    }
  }
`;

export const getPortalUrlQuery = gql`
  query GetPortalUrl {
    getPortalUrl
  }
`;
