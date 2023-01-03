import "./globals.scss";

import { Noto_Sans } from "@next/font/google";

// const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400"] });
// const ssp = Source_Sans_Pro({ subsets: ["latin"], weight: ["300", "400"] });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSans.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
