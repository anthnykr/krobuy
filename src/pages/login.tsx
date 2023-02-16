import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";

const LoginPage = async () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (session) {
    await router.push("/");
    return null; // TODO: check if correct
  }

  // TODO: style the page
  // TODO: potentially add credentials login
  return (
    <PageLayout pageTitle="Login">
      <Card>
        <button
          type="button"
          className="w-[200px] bg-black text-white"
          onClick={async () => await signIn("google", { callbackUrl: "/" })}
        >
          Login with Google
        </button>
      </Card>
    </PageLayout>
  );
};

export default LoginPage;
