import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <h1>CommonText</h1>
      <p>Surface relevant information as you type.</p>
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
      </ul>
      <ul>
        <li>
          <Link href="/signin/">Sign In</Link>
        </li>
        <li>
          <Link href="/signup/">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}
