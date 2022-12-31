import { User } from "@prisma/client";
import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import Utilities from "commonplace-utilities/lib";
import { Context } from "../../context";
import bcrypt from "bcryptjs";
import Helpers from "../../../lib/Helpers";

// const mailchimp = require("mailchimp-node")(process.env.MAILCHIMP_KEY);
import mailchimpPackage from "mailchimp-node";
import axios from "axios";
const mailchimp = mailchimpPackage(process.env.MAILCHIMP_KEY);

export const RegisterUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("registerUser", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, mixpanel, req }: Context) => {
        const utilities = new Utilities();
        const helpers = new Helpers();

        const credentials = utilities.helpers.parseAuthHeader(
          req.headers.authorization
        );
        const email = credentials[0];
        const password = credentials[1];

        const user: User = await new Promise(async (resolve, reject) => {
          utilities.logs.write(["Register User Incoming Request ", email]);

          bcrypt.hash(password, 12, async (err, hash) => {
            if (utilities.helpers.isDefinedWithContent(hash)) {
              const generatedUsername =
                utilities.helpers.emailToUsername(email);

              let newUser;
              try {
                newUser = await prisma.user.create({
                  data: {
                    email,
                    password: hash,
                    generatedUsername,
                    chosenUsername: generatedUsername,
                    role: "USER",
                    favoriteInterestId: null,
                  },
                });
              } catch (error) {
                reject(utilities.ERROR_CODES.C008);
              }

              // TODO: mandrill
              // TODO: mailchimp list
              // TODO: mixpanel

              resolve(newUser);
            } else {
              reject(utilities.ERROR_CODES.C005);
            }
          });
        });

        await helpers.subscribeMailchimp(email);

        // console.info("mailchimpData", mailchimpData);

        utilities.logs.write(["Register user", user]);

        // TODO: encrypt with JWT
        // TODO: set secure cookie tied to origin

        mixpanel.track("Sign Up - Complete", { user });

        const data = {
          userId: user.id,
        };

        const token = helpers.createJWT(data);

        return token;
      },
    });
  },
});
