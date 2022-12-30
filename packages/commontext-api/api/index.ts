import express from "express";
import { server } from "./server";

export const startApolloServer = async () => {
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
