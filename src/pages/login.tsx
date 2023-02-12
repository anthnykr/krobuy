import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";

const LoginPage: NextPage = () => {
  return (
    <PageLayout pageTitle="Login">
      <Card>
        <button
          type="button"
          className="bg-black text-white"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Login with Google
        </button>
      </Card>
    </PageLayout>
  );
};

export default LoginPage;
