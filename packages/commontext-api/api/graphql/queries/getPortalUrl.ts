import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const PortalUrlQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getPortalUrl", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const stripe = require("stripe")(process.env.STRIPE_KEY);

        const session = await stripe.billingPortal.sessions.create({
          customer: currentUser.stripeCustomerId,
          return_url: process.env.WEBAPP_DOMAIN + "/settings",
        });

        return session.url;
      },
    });
  },
});
