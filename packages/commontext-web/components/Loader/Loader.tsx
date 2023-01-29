import * as React from "react";

import styles from "./Loader.module.scss";

import { LoaderProps } from "./Loader.d";
import { BarLoader, BounceLoader } from "react-spinners";

const Loader: React.FC<LoaderProps> = () => {
  return (
    <section className={styles.loader}>
      {/* <BounceLoader color={"#5ec262"} size={50} /> */}
      <BarLoader color={"#5ec262"} height={10} width={250} />
    </section>
  );
};

export default Loader;
