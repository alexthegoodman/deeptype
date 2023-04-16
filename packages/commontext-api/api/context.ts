import { PrismaClient, User } from "@prisma/client";
import MixpanelClient from "../helpers/mixpanel";
import { Request } from "express";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-27u0QhfhY8rWqMDmiUBdRw6E",
  apiKey: process.env.OPENAI_API_KEY,
});

// TODO: add this to context
const openai = new OpenAIApi(configuration);

const prisma = new PrismaClient();
const mixpanel = new MixpanelClient();

export interface Context {
  prisma: PrismaClient;
  mixpanel: MixpanelClient;
  req: Request;
  currentUser: User;
  openai: OpenAIApi;
}

export const context = {
  prisma,
  mixpanel,
  openai,
};
