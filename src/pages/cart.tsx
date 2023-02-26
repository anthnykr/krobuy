import { type NextPage } from "next";
import PageLayout from "../components/PageLayout";

const Cart: NextPage = () => {
  return (
    <PageLayout pageTitle="Cart">
      <main className="flex divide-x">
        <section className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Cart</h1>
        </section>

        <section className="space-y-3 p-6">
          <h2 className="text-xl font-semibold text-blue-600">Order Summary</h2>
          <div className="flex flex-col rounded-lg bg-gray-300 p-3 text-gray-600">
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

            <button className="rounded-lg border border-blue-700 bg-blue-600 py-2 px-3 text-gray-200">
              Checkout
            </button>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Cart;
