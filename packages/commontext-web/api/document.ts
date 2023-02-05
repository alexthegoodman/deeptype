import { documentQuery } from "../graphql/document";
import graphClient from "../helpers/GQLClient";

export const getDocumentData = async (token: string, documentId: string) => {
  graphClient.setupClient(token);

  const { document } = await graphClient.client?.request(documentQuery, {
    documentId,
  });

  return document;
};
