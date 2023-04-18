import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { EdgebrixStudio, useToken } from "@edgebrix-sdk/react";
import { use, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { BG } from "../components/BG";
import { useRouter } from "next/router";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import fetcher from "./api/fetcher";
import useSWR from "swr";

export default function Home() {
  const { token, setToken } = useToken();

  const { isLoaded, isSignedIn, user } = useUser();

  const {
    data: EdgebirxToken,
    error,
    isLoading,
  } = useSWR<any>(isSignedIn ? "/api/EdgebrixToken" : null, fetcher, {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!EdgebirxToken?.token) return;
    if (token) return;
    console.log("user", EdgebirxToken);
    setToken(EdgebirxToken?.token);
  }, [EdgebirxToken]);

  // const r = useRouter();

  // useEffect(() => {
  //   const t = r.query.token;
  //   if (t && token == "") {
  //     console.log("token", t);
  //     setToken(t as string);
  //   } else {
  //     setToken(
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiY2xibmc4Z2U5MDAwMDA4anlmaDRrZnU5cSIsInVzZXJfaWQiOiJ1c2VyXzJJcFJ6cXVxVWRVeEhCUmJVbkVISDFvOG1GQyIsIm9yZ2FuaXphdGlvbl9pZCI6IjEyMzRfZXhhbXBsZV9vcmdfaWQiLCJ1c2VyX2RldGFpbHMiOnsiZW1haWwiOiJ5YWtpcnBlcmxpbkBnbWFpbC5jb20iLCJwcm9maWxlX3BpY3R1cmVfdXJsIjoiaHR0cHM6Ly9pbWFnZXMuY2xlcmsuZGV2L29hdXRoX2dvb2dsZS9pbWdfMklwUzAwem83ZzE3VU54RFZEbEJJaW93TFVVLmpwZWcifSwib3JnYW5pemF0aW9uX2RldGFpbHMiOnt9LCJpYXQiOjE2NzUzNDA4MDh9.f-XhgX22HNT8zvaCgOdT0lSS2ClKoXNTzzlh3BeEafM"
  //     );
  //   }
  // }, [r]);

  return (
    <>
      <Head>
        <title>Edgebrix | Demo</title>
        <meta
          name="description"
          content="The embedded workflow platform for developers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <main
          className={styles.main}
          style={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <div className={styles.description}>
            {/* <p>
              npm install&nbsp;
              <code className={styles.code}>@edgebrix-sdk/react</code>
            </p> */}
            <a
              href="https://edgebrix.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://res.cloudinary.com/dhwxfvlrn/image/upload/v1671793138/logo/e1.svg"
                alt="Edgebrix Logo"
                className={styles.vercelLogo}
                width={100}
                height={28}
                priority
              />
            </a>

            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          <SignedIn>
            <div
              className={styles.center}
              style={{
                width: "100%",
                height: "70vh",
                margin: "20px",
                border: "1px solid #ccc",
              }}
            >
              {token && (
                <>
                  <EdgebrixStudio
                    //logo_url={false}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  ></EdgebrixStudio>
                </>
              )}
            </div>
          </SignedIn>
          <SignedOut>
            <main>
              <div className="flex">
                <div className="m-auto">
                  <SignIn redirectUrl="/" />
                </div>
              </div>
            </main>
          </SignedOut>

          <div className={styles.grid}>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Docs <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Find in-depth information about Edgebrix features and&nbsp;API.
              </p>
            </a>

            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Learn <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Learn about Edgebrix in an interactive course with&nbsp;quizzes!
              </p>
            </a>

            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Templates <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Discover and deploy boilerplate example Edgebrix&nbsp;projects.
              </p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Deploy <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Instantly deploy your Edgebrix site to a shareable URL
                with&nbsp;Vercel.
              </p>
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
