import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <h1>Scribe Web</h1>
      <Link href="/browse/">Browse Documents</Link>
      <Link href="/settings/">Go to Settings</Link>
      <Link href="/editor/">Go to Editor</Link>

      <Link href="/signin/">Sign In</Link>
      <Link href="/signup/">Sign Up</Link>
    </div>
  );
}
