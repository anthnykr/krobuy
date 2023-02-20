import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
  productName: string;
  productPrice: number;
  productImage: string;
}

function ProductCard({ productName, productPrice, productImage }: Props) {
  return (
    <Link
      href={{
        pathname: "/[productName]",
        query: { productName },
      }}
    >
      <div className="flex w-[200px] flex-col items-center gap-1 border pb-2 hover:shadow-2xl">
        <div className="relative h-[200px] w-[200px]">
          <Image src={productImage} alt={`${productName} image`} fill />
        </div>

        <h1 className="font-semibold">{productName}</h1>

        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <StarIcon className="h-5 w-5 text-gray-300" />
          <StarIcon className="h-5 w-5 text-gray-300" />
          <span className="text-sm text-gray-400">(100)</span>
        </div>

        <span className="text-gray-700">{`$${productPrice}`}</span>
      </div>
    </Link>
  );
}

export default ProductCard;
