import { type NextPage } from "next";
import Image from "next/image";
import PageLayout from "../components/PageLayout";
import { productData } from "../context/product-data";
import CartContext from "../context/Cart/CartContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

type product = {
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

const Cart: NextPage = () => {
  const { cart, setCart } = useContext(CartContext);
  // Getting cart from local storage whenever cart gets changed
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const router = useRouter();

  const { products, error } = productData();
  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  const subtotal = (cart: product[]) => {
    return cart.reduce(
      (sum, currentValue) =>
        sum + currentValue.productPrice * currentValue.quantity,
      0
    );
  };

  return (
    <PageLayout pageTitle="Cart">
      <main className="flex flex-col lg:flex-row">
        {/* TODO: play with the width especially small screens */}
        <section className="w-[600px] p-6">
          <h1 className="mb-6 text-2xl font-bold text-blue-600">Cart</h1>
          {cart &&
            cart.map((item, index) => {
              return (
                <div key={item.productName}>
                  <div className="flex items-center gap-6">
                    <div className="relative h-[150px] w-[150px]">
                      <Image
                        src={item.productImage}
                        alt={`${item.productName} Image`}
                        fill
                      />
                    </div>

                    <div>
                      <h1 className="text-lg font-semibold">
                        {item.productName}
                      </h1>
                      <p className="text-gray-700">
                        Unit Price: ${item.productPrice}
                      </p>
                      <p className="text-gray-700">
                        <span>Quantity: </span>
                        {item.quantity}
                      </p>
                      <p className="text-gray-700">
                        Subtotal: ${item.quantity * item.productPrice}
                      </p>
                    </div>
                  </div>

                  {index !== cart.length - 1 && <hr className="my-6" />}
                </div>
              );
            })}
        </section>

        <section className="w-[300px] space-y-3 p-6">
          <h2 className="text-2xl font-semibold text-blue-600">
            Order Summary
          </h2>
          <div className="flex flex-col gap-1 rounded-lg bg-gray-300 p-6 text-gray-600">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal(cart)}</span>
            </p>

            <p className="flex justify-between">
              <span>Shipping</span>
              <span>$5</span>
            </p>

            <p className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${0.1 * subtotal(cart)}</span>
            </p>

            <p className="flex justify-between">
              <span>Total</span>
              <span>${1.1 * subtotal(cart)}</span>
            </p>

            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="mt-2 rounded-lg border border-blue-700 bg-blue-600 py-2 px-3 text-gray-100"
            >
              Checkout
            </button>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Cart;
