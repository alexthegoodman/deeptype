import { PrismaClient, User } from "@prisma/client";
import MixpanelClient from "../helpers/mixpanel";
import { Request } from "express";

const prisma = new PrismaClient();
const mixpanel = new MixpanelClient();

export interface Context {
  prisma: PrismaClient;
  mixpanel: MixpanelClient;
  req: Request;
  currentUser: User;
}

export const context = {
  prisma,
  mixpanel,
};
