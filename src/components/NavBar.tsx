import React, { useContext, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CartContext from "../context/Cart/CartContext";
import { signOut, useSession } from "next-auth/react";

type product = {
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

function NavBar() {
  const { cart, setCart } = useContext(CartContext);
  // Getting cart from local storage whenever cart gets changed
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]") as product[]);
  }, []);

  const { data: session } = useSession();

  return (
    <div className="sticky flex w-full justify-between bg-gray-200 py-5 px-8">
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600">KroBuy</h1>
      </Link>
      <div className="flex items-center gap-6">
        <div className="relative">
          <Link href="/cart">
            <ShoppingCartIcon className="h-7 w-7" />
          </Link>
          {cart && cart.length > 0 && (
            <span className="absolute -top-1 -right-1 h-2 w-2">
              <span className="absolute h-2 w-2 animate-[ping_3s_infinite] rounded-full bg-blue-500 opacity-75"></span>
              <span className="absolute h-2 w-2 rounded-full bg-blue-600 text-white"></span>
            </span>
          )}
        </div>
        {!session ? (
          <Link href="/login">Login</Link>
        ) : (
          <button onClick={() => void signOut({ callbackUrl: "/" })}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
