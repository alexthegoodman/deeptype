import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const nextCookies = cookies();
  const coUserToken = nextCookies.get("coUserToken");

  if (!coUserToken) {
    redirect("/");
  }

  return <section>{children}</section>;
}
