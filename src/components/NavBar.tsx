import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function NavBar() {
  return (
    <div className="sticky flex w-full justify-between bg-gray-200 py-5 px-8">
      {/* TODO: maybe make this a link to "/" */}
      <h1 className="text-2xl font-bold text-blue-600">KroBuy</h1>
      <ShoppingCartIcon className="h-7 w-7" />
    </div>
  );
}

export default NavBar;
