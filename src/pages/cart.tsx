import { type NextPage } from "next";
import Image from "next/image";
import PageLayout from "../components/PageLayout";
import { productData } from "../context/product-data";
import CartContext from "../context/Cart/CartContext";
import { useContext } from "react";

const Cart: NextPage = () => {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);

  const { products, error } = productData();
  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <PageLayout pageTitle="Cart">
      <main className="flex flex-col lg:flex-row">
        {/* TODO: play with the width especially small screens */}
        <section className="w-[600px] space-y-3 p-6">
          <h1 className="text-2xl font-bold text-blue-600">Cart</h1>
          {cart &&
            cart.map((item, index) => {
              return (
                <>
                  <div className="flex items-center gap-6" key={index}>
                    <div className="relative h-[150px] w-[150px]">
                      {/* TODO: fix this page when Context API is implemented */}
                      {/* TODO: make the cart item into a component */}
                      <Image
                        src={
                          products.filter(
                            (product: any) =>
                              product.productName === item.productName
                          )[0].productImage
                        }
                        alt={`${item.productName} Image`}
                        fill
                      />
                    </div>

                    <div>
                      <h1 className="text-lg font-semibold">
                        {item.productName}
                      </h1>
                      <p className="text-gray-700">
                        Unit Price: $
                        {
                          products.filter(
                            (product: any) =>
                              product.productName === item.productName
                          )[0].productPrice
                        }
                      </p>
                      <p className="text-gray-700">
                        <span>Quantity: </span>
                        {item.quantity}
                      </p>
                      <p className="text-gray-700">
                        Subtotal: $
                        {products.filter(
                          (product: any) =>
                            product.productName === item.productName
                        )[0].productPrice * item.quantity}
                      </p>
                    </div>
                  </div>

                  {index !== cart.length - 1 && <hr />}
                </>
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
              <span>$0.00</span>
            </p>

            <p className="flex justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </p>

            <p className="flex justify-between">
              <span>Tax</span>
              <span>$0.00</span>
            </p>

            <p className="flex justify-between">
              <span>Total</span>
              <span>$0.00</span>
            </p>

            <button className="mt-2 rounded-lg border border-blue-700 bg-blue-600 py-2 px-3 text-gray-100">
              Checkout
            </button>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Cart;
