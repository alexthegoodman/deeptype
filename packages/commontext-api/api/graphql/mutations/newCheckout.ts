import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const NewCheckoutMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newCheckout", {
      type: "String",
      args: {
        frequency: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { frequency },
        { prisma, currentUser }: Context,
        x
      ) => {
        const stripe = require("stripe")(process.env.STRIPE_KEY);

        const priceId =
          frequency === "MONTHLY"
            ? process.env.STRIPE_MONTHLY_PRICE
            : process.env.STRIPE_ANNUAL_PRICE;

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${process.env.WEBAPP_DOMAIN}?success=true`,
          cancel_url: `${process.env.WEBAPP_DOMAIN}?canceled=true`,
          automatic_tax: { enabled: true },
        });

        return session.url;
      },
    });
  },
});
