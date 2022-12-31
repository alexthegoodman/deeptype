import { GraphQLClient } from "graphql-request";

export class GQLClient {
  client;
  token;
  url;

  constructor(url) {
    this.url = url;
  }

  setupClient(token) {
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
