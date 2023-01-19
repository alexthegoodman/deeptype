import { extendType, nonNull, stringArg } from "nexus";

import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Context } from "../../context";
import ERROR_CODES from "../../../helpers/ERROR_CODES";
import Helpers from "../../../helpers/Helpers";

export const CurrentUserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getCurrentUser", {
      type: "User",
      args: {},
      resolve: async (
        _,
        {},
        { prisma, mixpanel, currentUser, req }: Context,
        x
      ) => {
        return currentUser;
      },
    });
  },
});
