"use client";

import request from "graphql-request";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
const { DateTime } = require("luxon");
// import LogRocket from "logrocket";

import { authenticateQuery } from "../../../graphql/user";
import { registerMutation } from "../../../graphql/user";
import FormInput from "../../fields/FormInput/FormInput";
import FormMessage from "../../fields/FormMessage/FormMessage";

import { AuthFormProps } from "./AuthForm.d";
// import Utilities from "commonplace-utilities/lib";
import { fullDomain, graphqlUrl } from "../../../defs/urls";
import Helpers from "../../../helpers/Helpers";
import { CookieSettings } from "../../../defs/CookieSettings";

import styles from "./AuthForm.module.scss";
import { IBM_Plex_Mono } from "@next/font/google";
import Link from "next/link";

// import { useTranslation } from "next-i18next";
// import MixpanelBrowser from "../../../helpers/MixpanelBrowser";
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const AuthForm: React.FC<AuthFormProps> = ({
  onClick = (e) => console.info("Click AuthForm"),
  type = "sign-in",
}) => {
  // const { t } = useTranslation();
  const helpers = new Helpers();
  // const mixpanel = new MixpanelBrowser();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");
  const [submitLoading, setSubmitLoading] = React.useState(false);

  console.info("cookies", cookies);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);

    setSubmitLoading(true);

    try {
      var userIdData, token;

      const authorizationHeader = helpers.createAuthHeader(
        `${data.email}:${data.password}`
      );

      if (type === "sign-in") {
        // mixpanel.track("Sign In - Attempt", { email: data.email });

        userIdData = await request(
          graphqlUrl,
          authenticateQuery,
          {},
          {
            Authorization: authorizationHeader,
          }
        );

        token = userIdData.authenticate;
      } else if (type === "sign-up") {
        // mixpanel.track("Sign Up - Attempt", { email: data.email });

        userIdData = await request(
          graphqlUrl,
          registerMutation,
          {},
          {
            Authorization: authorizationHeader,
          }
        );

        token = userIdData.registerUser;

        // const ReactPixel = require("react-facebook-pixel");
        // ReactPixel.default.trackCustom("SignUp", {});
      }

      const expireCookie = DateTime.now()
        .plus({ weeks: 1 })
        .endOf("day")
        .toUTC()
        .toJSDate();

      console.info(
        "token",
        token,
        fullDomain,
        expireCookie,
        process.env.NODE_ENV,
        process.env.NEXT_PUBLIC_APP_ENV
      );

      setCookie("coUserToken", token, {
        ...CookieSettings,
        expires: expireCookie,
      });

      console.info("cookie set with token");

      // try {
      //   LogRocket.identify(data.email);
      // } catch (error) {
      //   console.error("LogRocket error", error);
      // }

      console.info("redirect to browse");

      // cleanup and
      setFormErrorMessage("");
      router.push("/browse");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.errors[0].message;
      setFormErrorMessage(errorMessage);
      setSubmitLoading(false);
    }
  };

  const onError = (error: any) => console.error(error);

  const headline = type === "sign-in" ? "Sign In" : "Sign Up";
  let submitButtonText = type === "sign-in" ? "Sign In" : "Sign Up";

  if (submitLoading) submitButtonText = "Loading...";

  return (
    <section className={styles.authForm}>
      <div className={styles.authFormInner}>
        <h1 className={ibmPlexMono.className}>{headline}</h1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FormMessage type="error" message={formErrorMessage} />

          <FormInput
            type="email"
            name="email"
            placeholder={"Email"}
            register={register}
            errors={errors}
            validation={{
              required: "Email Required",
            }}
          />

          <FormInput
            type="password"
            name="password"
            placeholder={"Password"}
            register={register}
            errors={errors}
            validation={{
              required: "Password Required",
            }}
          />

          <button className={styles.btn} type="submit" disabled={submitLoading}>
            {submitButtonText}
          </button>
        </form>
        <div className={styles.addtActions}>
          {type === "sign-in" ? (
            <span>
              Or you may <Link href="sign-up">Sign Up</Link> instead
            </span>
          ) : (
            <span>
              Or you may <Link href="sign-in">Sign In</Link> instead
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
