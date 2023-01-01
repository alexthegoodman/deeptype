import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import styles from "./page.module.scss";
import LogOutLink from "../components/LogOutLink/LogOutLink";

export default function Home() {
  const nextCookies = cookies();
  const coUserToken = nextCookies.get("coUserToken");

  return (
    <div>
      <h1>CommonText</h1>
      <p>Surface relevant information as you type.</p>
      <span>Logged In: {coUserToken ? "true" : "false"}</span>
      {coUserToken ? (
        <ul>
          <li>
            <Link href="/browse/">Browse Documents</Link>
          </li>
          <li>
            <Link href="/settings/">Go to Settings</Link>
          </li>
          <li>
            <Link href="/editor/">Go to Editor</Link>
          </li>
          <li>
            <LogOutLink />
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link href="/sign-in/">Sign In</Link>
          </li>
          <li>
            <Link href="/sign-up/">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
