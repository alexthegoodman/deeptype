import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

import { server } from "./server";
import { context } from "./context";

export const startApolloServer = async () => {
  await server.start();

  const app = express();

  // server.applyMiddleware({ app });
  // https://www.apollographql.com/docs/apollo-server/api/express-middleware/#context
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, ...context };
      },
    })
  );

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.info(`🚀 Server ready at http://localhost:4000/graphql`);
};
