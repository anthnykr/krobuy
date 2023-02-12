import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (!session) {
    router.push("/login");
  }

  return <PageLayout pageTitle="KroBuy">Hello</PageLayout>;
};

export default Home;
