import * as React from "react";

import styles from "./Meta.module.scss";

import { MetaProps } from "./Meta.d";
import Script from "next/script";

const Meta: React.FC<MetaProps> = ({
  title = "Surface Relevant Information as You Type",
  description = "",
}) => {
  const metaTitle = title + " | DeepType";
  const initializeHotjar = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3336103,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;

  const ogImage = "/aboutDeeptype.jpg";

  return (
    <>
      <title>{metaTitle}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content="https://deeptype.app/"/> */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="twitter:card" content="summary_large_image" />
      {/* <meta property="twitter:url" content="https://deeptype.app/"/> */}
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <link rel="icon" href="/favicon.ico" />
      <script src="https://unpkg.com/phosphor-icons" async></script>
      <Script
        id="init-hotjar"
        dangerouslySetInnerHTML={{ __html: initializeHotjar }}
      />
    </>
  );
};

export default Meta;
