import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";

interface Props {
  pageTitle: string;
  children: React.ReactNode;
}

function PageLayout({ pageTitle, children }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className="flex w-full flex-col items-center">
        <NavBar />
        <section className="w-full p-6">{children}</section>
      </main>
    </>
  );
}

export default PageLayout;
