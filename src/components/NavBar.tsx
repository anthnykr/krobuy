import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function NavBar() {
  return (
    <div className="sticky flex w-full justify-between bg-gray-200 py-5 px-8">
      {/* TODO: maybe make this a link to "/" */}
      <h1 className="text-2xl font-bold text-blue-600">KroBuy</h1>
      <div className="flex items-center gap-6">
        <ShoppingCartIcon className="h-7 w-7" />
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

export default NavBar;
