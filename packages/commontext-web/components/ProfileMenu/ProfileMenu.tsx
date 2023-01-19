"use client";

import * as React from "react";

import styles from "./ProfileMenu.module.scss";

import { ProfileMenuProps } from "./ProfileMenu.d";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { getUserData } from "../../app/(home)/layout";
import graphClient from "../../helpers/GQLClient";
import { useCookies } from "react-cookie";

const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const { data, error, isLoading, mutate } = useSWR(
    "homeLayout",
    () => getUserData(token),
    {
      revalidateOnMount: true,
    }
  );

  if (isLoading) return <></>

  if (error) return <>Error</>

  return (
    <section className={styles.profileMenu}>
      <div className={styles.profileMenuInner}>
        <div className={styles.menuTrigger}>
          <span>{data.email}</span>
          {/* <Image src="" alt="" /> */}
        </div>
        {/* <div className={styles.dropdown}>
          <ul>
            <li><Link>Links</Link></li>
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default ProfileMenu;
