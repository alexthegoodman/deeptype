"use client";

import PricingItem from "../../../components/PricingItem/PricingItem";
import SiteFooter from "../../../components/SiteFooter/SiteFooter";
import SiteHeader from "../../../components/SiteHeader/SiteHeader";

// import styles from "./page.module.scss";

import { IBM_Plex_Mono } from "@next/font/google";
import { useEffect } from "react";
import request from "graphql-request";
import { graphqlUrl } from "../../../defs/urls";
import { confirmSubscriptionMutation } from "../../../graphql/user";
import IntroHero from "../../../components/IntroHero/IntroHero";
import graphClient from "../../../helpers/GQLClient";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function SubscribeSuccess({ searchParams }) {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;
  const router = useRouter();

  graphClient.setupClient(token);

  const confirmSubscription = async (sessionId, subscriptionToken) => {
    await graphClient.client?.request(confirmSubscriptionMutation, {
      sessionId,
      token: subscriptionToken,
    });
    router.push("/browse");
  };

  useEffect(() => {
    if (searchParams.stripeSessionId && searchParams.userSubscriptionToken) {
      confirmSubscription(
        searchParams.stripeSessionId,
        searchParams.userSubscriptionToken
      );
    }
  }, []);

  return (
    <>
      <main className={ibmPlexMono.className}>
        <IntroHero headline="Confirming Subscription..." />
      </main>
    </>
  );
}
