import { type NextPage } from "next";
import PageLayout from "../components/PageLayout";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { fetcher } from "../utils/requests";

type product = {
  productName: string;
  productPrice: number;
  productImage: string;
};

const Home: NextPage = () => {
  const { data: products, error } = useSWR(
    "/api/static-data/products",
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <PageLayout pageTitle="KroBuy">
      <section className="flex w-full flex-wrap justify-center gap-6">
        {products.map((product: product) => {
          return <ProductCard {...product} key={product.productName} />;
        })}
      </section>
    </PageLayout>
  );
};

export default Home;
