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
        <div className="mt-6">{children}</div>
      </main>
    </>
  );
}

export default PageLayout;
