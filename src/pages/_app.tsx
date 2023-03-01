import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import CartContext from "../context/Cart/CartContext";

type cartType = {
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}[];

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [cart, setCart] = useState<cartType>([]);

  return (
    <SessionProvider session={session}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Toaster />
        <Component {...pageProps} />
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
