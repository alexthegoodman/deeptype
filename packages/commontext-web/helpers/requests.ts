import { getCurrentUserQuery, updateUserMutation } from "../graphql/user";
import graphClient from "./GQLClient";

export const getUserData = async (token: string) => {
  graphClient.setupClient(token);

  const { getCurrentUser } = await graphClient.client?.request(
    getCurrentUserQuery
  );

  return getCurrentUser;
};

export const updateUserData = async (token: string, documentTree) => {
  graphClient.setupClient(token);

  const { updateUser } = await graphClient.client?.request(updateUserMutation, {
    documentTree: JSON.stringify(documentTree),
  });

  return updateUser;
};
