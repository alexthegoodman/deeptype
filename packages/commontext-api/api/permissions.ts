import { ApolloError } from "apollo-server";
import { shield, allow, deny, rule, and, or, not } from "graphql-shield";

const isAdmin = rule()(async (parent, args, ctx, info) => {
  const allowed = ctx.currentUser.role === "ADMIN";
  return allowed;
});

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const allowed =
    ctx.currentUser !== null && typeof ctx.currentUser !== "undefined";
  return allowed;
});

export const permissions = shield(
  {
    Query: {
      "*": isAuthenticated,
      authenticate: not(isAuthenticated),
      // getDashboardData: and(isAuthenticated, isAdmin),
    },
    Mutation: {
      "*": isAuthenticated,
      registerUser: not(isAuthenticated),
    },
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        return thrownThing;
      } else if (thrownThing instanceof Error) {
        console.error(thrownThing);
        return new ApolloError(thrownThing.message, "ERR_INTERNAL_SERVER");
      } else {
        console.error("The resolver threw something that is not an error.");
        if (thrownThing === null) {
          thrownThing = "NOT AUTHORIZED!";
        }
        console.error(thrownThing);
        return new ApolloError(thrownThing as string, "ERR_INTERNAL_SERVER");
      }
    },
  }
);
