"use client";

import { useCookies } from "react-cookie";

import EmptyNotice from "../../components/EmptyNotice/EmptyNotice";

export default function Editor() {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  return (
    <EmptyNotice message="Create a document in the left-hand sidebar to begin" />
  );
}
