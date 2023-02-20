import Image from "next/image";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";
import { fetcher } from "../utils/requests";
import useSWR from "swr";

type productType = {
  productName: string;
  productPrice: number;
  productImage: string;
};

const ProductPage = () => {
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
      <h1>{product.productName}</h1>
      <div className="relative h-[200px] w-[200px]">
        <Image
          src={product.productImage}
          alt={`${product.productName} image`}
          fill
        />
      </div>
      <h2>{product.productPrice}</h2>
    </PageLayout>
  );
};

export default ProductPage;
