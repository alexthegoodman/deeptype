import { User } from "@prisma/client";
import { extendType } from "nexus";
import { Context } from "../../context";
import bcrypt from "bcryptjs";

// const mailchimp = require("mailchimp-node")(process.env.MAILCHIMP_KEY);
// import mailchimpPackage from "mailchimp-node";
// import axios from "axios";
import Helpers from "../../../helpers/Helpers";
import ERROR_CODES from "../../../helpers/ERROR_CODES";

import { v4 as uuidv4 } from "uuid";

// const mailchimp = mailchimpPackage(process.env.MAILCHIMP_KEY);

export const RegisterUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("registerUser", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, mixpanel, req }: Context) => {
        const helpers = new Helpers();

        const credentials = helpers.parseAuthHeader(req.headers.authorization);
        const email = credentials[0];
        const password = credentials[1];

        const user: User = await new Promise(async (resolve, reject) => {
          console.info("Register User Incoming Request ", email);

          bcrypt.hash(password, 12, async (err, hash) => {
            if (helpers.isDefinedWithContent(hash)) {
              let newUser;
              try {
                newUser = await prisma.user.create({
                  data: {
                    email,
                    password: hash,
                    role: "USER",
                    subscriptionToken: uuidv4(),
                    subscription: "NONE",
                    frequency: "",
                  },
                });
              } catch (error) {
                reject(ERROR_CODES.C008);
              }

              // TODO: mandrill
              // TODO: mailchimp list
              // TODO: mixpanel

              resolve(newUser);
            } else {
              reject(ERROR_CODES.C005);
            }
          });
        });

        // await helpers.subscribeMailchimp(email);

        // console.info("mailchimpData", mailchimpData);

        console.info("Register user", user);

        // TODO: encrypt with JWT
        // TODO: set secure cookie tied to origin

        // mixpanel.track("Sign Up - Complete", { user });

        const data = {
          userId: user.id,
        };

        const token = helpers.createJWT(data);

        return token;
      },
    });
  },
});
