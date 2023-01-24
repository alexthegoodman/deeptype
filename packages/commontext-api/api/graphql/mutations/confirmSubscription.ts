import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const ConfirmSubscriptionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("confirmSubscription", {
      type: "User",
      args: {
        sessionId: nonNull(stringArg()),
        token: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { sessionId, token },
        { prisma, currentUser }: Context,
        x
      ) => {
        const stripe = require("stripe")(process.env.STRIPE_KEY);
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        console.info("session", session);

        let frequency = "";
        if (session.amount_total === 1900) {
          frequency = "MONTHLY";
        } else if (session.amount_total === 14400) {
          frequency = "ANNUAL";
        }

        const updatedUser = await prisma.user.update({
          where: {
            subscriptionToken: token,
          },
          data: {
            subscription: "STARTER",
            frequency,
            stripeCustomerId: session.customer,
          },
        });

        return updatedUser;
      },
    });
  },
});
