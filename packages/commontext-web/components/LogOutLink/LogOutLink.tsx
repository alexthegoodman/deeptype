"use client";

import * as React from "react";

import styles from "./LogOutLink.module.scss";

import { LogOutLinkProps } from "./LogOutLink.d";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const LogOutLink: React.FC<LogOutLinkProps> = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);

  const onClick = () => {
    removeCookie("coUserToken");
    router.refresh();
  };

  return (
    <a href="#!" onClick={onClick}>
      Sign Out
    </a>
  );
};

export default LogOutLink;
