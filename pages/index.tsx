import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Musa</title>
        <meta name="description" content="Musa app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/artists">Artists</Link>
    </div>
  );
};

export default Home;
