import useSWR from "swr";
import { fetcher } from "../utils/requests";

type product = {
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
};

export function ProductData() {
  const { data: products, error } = useSWR<product[], Error>(
    "/api/static-data/products",
    fetcher
  );

  return {
    products,
    error,
  };
}
