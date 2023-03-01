import useSWR from "swr";
import { fetcher } from "../utils/requests";

export function productData() {
  const { data: products, error } = useSWR(
    "/api/static-data/products",
    fetcher
  );

  return {
    products,
    error,
  };
}
