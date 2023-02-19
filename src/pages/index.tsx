import { type NextPage } from "next";
import PageLayout from "../components/PageLayout";
import ProductCard from "../components/ProductCard";

const Home: NextPage = () => {
  return (
    <PageLayout pageTitle="KroBuy">
      <section className="mt-6 flex w-full flex-wrap justify-center gap-6">
        <ProductCard
          productName="Product 1"
          productPrice={10}
          productImage="https://via.placeholder.com/200"
        />

        <ProductCard
          productName="Product 1"
          productPrice={10}
          productImage="https://via.placeholder.com/200"
        />

        <ProductCard
          productName="Product 1"
          productPrice={10}
          productImage="https://via.placeholder.com/200"
        />

        <ProductCard
          productName="Product 1"
          productPrice={10}
          productImage="https://via.placeholder.com/200"
        />

        <ProductCard
          productName="Product 1"
          productPrice={10}
          productImage="https://via.placeholder.com/200"
        />

        <ProductCard
          productName="Product 1"
          productPrice={10}
          productImage="https://via.placeholder.com/200"
        />
      </section>
    </PageLayout>
  );
};

export default Home;
