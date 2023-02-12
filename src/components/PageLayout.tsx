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
        <title>KroBuy</title>
      </Head>
      <main className="flex w-full flex-col items-center">
        <NavBar />
        {children}
      </main>
    </>
  );
}

export default PageLayout;
