import { GraphQLClient } from "graphql-request";
import { graphqlUrl } from "../defs/urls";

export class GQLClient {
  client: GraphQLClient | null = null;
  token: string = "";
  url: string = "";

  constructor(url: string) {
    this.url = url;
  }

  setupClient(token: string) {
    const self = this;
    this.token = token;
    this.client = new GraphQLClient(this.url, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
      timeout: 10000, // 10s
    });

    return self;
  }
}

const graphClient = new GQLClient(graphqlUrl);

export default graphClient;
