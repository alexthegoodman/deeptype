import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

import { server } from "./server";
import { context } from "./context";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

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
        const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        let currentUser;

        try {
          const tokenHeader = req.header(tokenHeaderKey);
          const token = tokenHeader?.split("Bearer ")[1] as string;

          const verified = jwt.verify(token, jwtSecretKey);

          if (verified && typeof verified !== "string") {
            currentUser = await prisma.user.findFirst({
              where: {
                id: verified.userId,
              },
            });

            console.info(
              "Verified Token",
              verified,
              "currentUser",
              currentUser
            );
          } else {
            console.warn("Token Not Verified 1");
          }
        } catch (error) {
          // ex. if token is not provided
          console.warn("Token Not Verified 2");
        }

        return { req, currentUser, ...context };
      },
    })
  );

  await new Promise<void>((r) => app.listen({ port: process.env.PORT ? process.env.PORT : 4000 }, r));

  console.info(`🚀 Server ready at http://localhost:4000/graphql`);
};
