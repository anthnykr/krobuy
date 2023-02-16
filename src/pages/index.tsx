import { type NextPage } from "next";
import PageLayout from "../components/PageLayout";
import ProductCard from "../components/ProductCard";

const Home: NextPage = () => {
  return (
    <PageLayout pageTitle="KroBuy">
      <h1 className="text-xl font-semibold text-blue-600">Welcome</h1>

      <section className="mt-6 flex flex-wrap gap-6">
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
