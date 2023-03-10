import Image from "next/image";
import PageLayout from "../components/PageLayout";
import { StarIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { toast } from "react-hot-toast";
import { productData } from "../context/product-data";
import CartContext from "../context/Cart/CartContext";

type productType = {
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
};

type Props = {
  query: {
    productName: string;
  };
};

const ProductPage = ({ query }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetching the product data
  const { products, error } = productData();
  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  // Obtaining the product name from the url
  const productName = query.productName;
  const product: productType = products.find(
    (product: productType) => product.productName === productName
  );

  const addToCart = () => {
    setCart([
      ...cart,
      {
        productName: product.productName,
        productPrice: product.productPrice,
        productImage: product.productImage,
        quantity,
      },
    ]);
    setQuantity(1);
    toast.success("Added to cart successfully");
  };

  // TODO: add reviews to database and product page + let user submit review (DECIDE ON MONGODB OR POSTGRESQL)
  // TODO: add useContext for cart
  return (
    <PageLayout pageTitle={product.productName}>
      {/* TODO: maybe make this a grid with 2 columns instead of manually setting widths */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-20">
        <div className="relative h-[400px] w-[400px]">
          <Image
            src={product.productImage}
            alt={`${product.productName} image`}
            fill
          />
        </div>

        <div className="flex w-[400px] flex-col gap-3">
          <h1 className="text-4xl font-semibold">{product.productName}</h1>
          <h2 className="text-3xl text-gray-700">${product.productPrice}</h2>

          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <StarIcon className="h-5 w-5 text-gray-300" />
            <StarIcon className="h-5 w-5 text-gray-300" />
            <span className="text-sm text-gray-400">(100)</span>
          </div>

          <p>{product.productDescription}</p>

          <div className="flex items-start gap-3">
            <div className="flex border border-gray-700">
              <button
                type="button"
                className="inline-flex w-10 items-center justify-center text-2xl font-bold"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((quantity) => quantity - 1);
                  }
                }}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <input
                className="w-14 border border-y-0 border-gray-700 p-2 text-center"
                value={quantity}
                disabled
                required
              />

              <button
                type="button"
                className="inline-flex w-10 items-center justify-center text-2xl font-bold"
                onClick={() => {
                  setQuantity((quantity) => quantity + 1);
                }}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="rounded-lg border border-blue-700 bg-blue-600 py-2 px-3 text-gray-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
};

export default ProductPage;
