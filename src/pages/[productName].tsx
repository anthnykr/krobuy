import Image from "next/image";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";
import { fetcher } from "../utils/requests";
import useSWR from "swr";
import { SubmitHandler, useForm } from "react-hook-form";
import { StarIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

type productType = {
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
};

type addToCart = {
  quantity: number;
};

type Props = {
  query: {
    productName: string;
  };
};

const ProductPage = ({ query }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<addToCart>({
    defaultValues: {
      quantity: 1,
    },
  });

  const [quantity, setQuantity] = useState(1);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful]);

  // Fetching the product data
  const { data: products, error } = useSWR(
    "/api/static-data/products",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  // Obtaining the product name from the url
  // const router = useRouter();
  // const { productName } = router.query;
  const productName = query.productName;
  const product: productType = products.find(
    (product: productType) => product.productName === productName
  );

  const onSubmit: SubmitHandler<addToCart> = (data) => {
    console.log(data);
    setIsSubmitSuccessful(true);
    setQuantity(1);
  };

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
                  if (quantity > 1) {
                    setValue("quantity", quantity - 1);
                    setQuantity((quantity) => quantity - 1);
                  }
                }}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <input
                className="w-14 border border-y-0 border-gray-700 p-2 text-center"
                disabled
                required
                {...register("quantity")}
              />
              {errors.quantity && (
                <span className="text-sm text-red-500">
                  {errors.quantity.message}
                </span>
              )}
              <button
                type="button"
                className="inline-flex w-10 items-center justify-center text-2xl font-bold"
                onClick={() => {
                  setValue("quantity", quantity + 1);
                  setQuantity((quantity) => quantity + 1);
                }}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            <button className="rounded-lg border border-blue-700 bg-blue-600 py-2 px-3 text-gray-100">
              Add to Cart
            </button>
          </form>
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
