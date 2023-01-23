import { extendType, nonNull, stringArg } from "nexus";

import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Context } from "../../context";
import ERROR_CODES from "../../../helpers/ERROR_CODES";
import Helpers from "../../../helpers/Helpers";

export const AuthenticateQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("authenticate", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, mixpanel, req }: Context, x) => {
        const helpers = new Helpers();

        console.info("authenticate user", req.headers);

        const credentials = helpers.parseAuthHeader(req.headers.authorization as string);
        const email = credentials[0];
        const password = credentials[1];

        const user: User = await new Promise(async (resolve, reject) => {
          console.info("Authentication Request ", email);

          // find user match by email
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email },
            });
          } catch (error) {
            reject(error);
          }

          // if user is found, check for password match
          if (user && helpers.isDefinedWithContent(user)) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
              console.info("Authentication Credentials Valid");

              resolve(user);
            } else {
              console.error(ERROR_CODES.B003);
              reject(ERROR_CODES.B003);
            }
          } else {
            console.error(ERROR_CODES.C001);
            reject(ERROR_CODES.C001);
          }
        });

        console.info("Authenticate user", user);

        // TODO: set secure cookie tied to origin

        // mixpanel.track("Sign In - Complete", { user });

        const data = {
          userId: user.id,
        };

        const token = helpers.createJWT(data);

        return token;
      },
    });
  },
});
