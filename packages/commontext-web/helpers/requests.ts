import { getCurrentUserQuery } from "../graphql/user";
import graphClient from "./GQLClient";

export const getUserData = async (token: string) => {
    graphClient.setupClient(token);

    const { getCurrentUser } = await graphClient.client?.request(
        getCurrentUserQuery
    );

    return getCurrentUser;
};