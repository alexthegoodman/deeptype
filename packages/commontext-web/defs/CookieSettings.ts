import { cookieDomain } from "./urls";

export const CookieSettings = {
  sameSite: "strict" as "strict",
  domain: cookieDomain,
  secure: true, // only accessible via https
  path: "/",
};
