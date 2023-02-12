"use client";

import * as React from "react";

import styles from "./LogOutLink.module.scss";

import { LogOutLinkProps } from "./LogOutLink.d";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { CookieSettings } from "../../defs/CookieSettings";

const LogOutLink: React.FC<LogOutLinkProps> = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);

  const onClick = () => {
    removeCookie("coUserToken", {
      ...CookieSettings,
    });
    window.location.reload();
  };

  return (
    <a href="#!" onClick={onClick}>
      Sign Out
    </a>
  );
};

export default LogOutLink;
