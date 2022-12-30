import { PrismaClient } from "@prisma/client";
// import { Request } from "express";
// import { setupMixpanel } from "../mixpanel";

const prisma = new PrismaClient();
// const mixpanel = setupMixpanel();

export interface Context {
  prisma: PrismaClient;
  // mixpanel: any;
  // req: Request;
  // currentUser: User;
}

export const context = {
  prisma,
  // mixpanel,
};
