import Image from "next/image";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";
import { fetcher } from "../utils/requests";
import useSWR from "swr";
import { SubmitHandler, useForm } from "react-hook-form";
import { StarIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type productType = {
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
};

type addToCart = {
  quantity: number;
};

const ProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addToCart>();
  const onSubmit: SubmitHandler<addToCart> = (data) => console.log(data);

  const [quantity, setQuantity] = useState(1);

  const { data: products, error } = useSWR(
    "/api/static-data/products",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  const router = useRouter();
  const { productName } = router.query;
  // TODO: when refreshing the page it breaks, figure out why
  const product: productType = products.find(
    (product: productType) => product.productName === productName
  );

  // TODO: add reviews to database and product page + let user submit review (DECIDE ON MONGODB OR POSTGRESQL)
  // TODO: add redux for cart
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start gap-3"
          >
            <div className="flex border border-gray-700">
              <button
                type="button"
                className="inline-flex w-10 items-center justify-center text-2xl font-bold"
                onClick={() => {
                  quantity > 0 && setQuantity((quantity) => quantity - 1);
                }}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <input
                defaultValue={1}
                value={quantity}
                className="w-14 border border-y-0 border-gray-700 p-2 text-center"
                {...register("quantity", { required: true })}
              />
              <button
                type="button"
                className="inline-flex w-10 items-center justify-center text-2xl font-bold"
                onClick={() => setQuantity((quantity) => quantity + 1)}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            <button className="rounded-lg border border-blue-700 bg-blue-600 py-2 px-3 text-gray-200">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;
