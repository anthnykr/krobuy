import Image from "next/image";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";
import { fetcher } from "../utils/requests";
import useSWR from "swr";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const { data: products, error } = useSWR(
    "/api/static-data/products",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  const router = useRouter();
  const { productName } = router.query;

  const product: productType = products.find(
    (product: productType) => product.productName === productName
  );

  return (
    <PageLayout pageTitle={product.productName}>
      <div className="flex gap-20">
        <div className="relative h-[400px] w-[400px]">
          <Image
            src={product.productImage}
            alt={`${product.productName} image`}
            fill
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">{product.productName}</h1>
          <h2 className="text-3xl text-gray-700">${product.productPrice}</h2>
          <p>{product.productDescription}</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-3">
              <button type="button" className="text-2xl font-bold">
                -
              </button>
              <input
                defaultValue={0}
                className="w-10 rounded-lg border border-gray-700 p-1 text-center"
                {...register("quantity", { required: true })}
              />
              <button type="button" className="text-2xl font-bold">
                +
              </button>
            </div>

            <button className="rounded-lg border border-gray-700 py-2 px-3">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;
