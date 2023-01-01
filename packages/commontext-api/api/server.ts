import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { protectedSchema } from "./schema";
import { Context, context } from "./context";
// import jwt from "jsonwebtoken";
import { startStandaloneServer } from "@apollo/server/standalone";

// const prisma = new PrismaClient();

export const server = new ApolloServer({
  schema: protectedSchema,
  // context: async ({ req, res }) => {
  //   //   const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
  //   //   const jwtSecretKey = process.env.JWT_SECRET_KEY;
  //   //   let currentUser;

  //   //   try {
  //   //     const tokenHeader = req.header(tokenHeaderKey);
  //   //     const token = tokenHeader?.split("Bearer ")[1];

  //   //     const verified = jwt.verify(token, jwtSecretKey);

  //   //     if (verified) {
  //   //       currentUser = await prisma.user.findFirst({
  //   //         where: {
  //   //           id: verified.userId,
  //   //         },
  //   //       });

  //   //       console.info("Verified Token", verified, "currentUser", currentUser);
  //   //     } else {
  //   //       console.warn("Token Not Verified 1");
  //   //     }
  //   //   } catch (error) {
  //   //     // ex. if token is not provided
  //   //     console.warn("Token Not Verified 2");
  //   //   }

  //   return {
  //     //req, currentUser,
  //     ...context,
  //   } as Context;
  // },
  // TODO: set csrfPrevention as true
  //   csrfPrevention: true,
});

// use ./index.ts to start server instead
// const { url } = await startStandaloneServer(server);
