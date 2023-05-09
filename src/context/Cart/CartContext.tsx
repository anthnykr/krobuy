import { createContext } from "react";

type product = {
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

type CartContextType = {
  cart: product[];
  setCart: (cart: product[]) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {
    console.log("N/A");
  },
});

export default CartContext;
