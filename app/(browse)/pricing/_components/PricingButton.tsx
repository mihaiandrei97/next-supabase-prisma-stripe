import { Product } from "@/data-access/products";
import React from "react";
import { useFormStatus } from "react-dom";

export default function PricingButton({
  product,
  loggedIn,
}: {
  product: Product;
  loggedIn: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      name="proTier"
      value={product.proTier}
      style={{ background: product.color }}
      className={`rounded-xl text-white text-lg py-4 w-full my-8 font-semibold hover:opacity-80 group relative`}
    >
      {pending ? (
        "Loading..."
      ) : (
        <>
          Buy {product.name}
        </>
      )}

      {!loggedIn && (
        <a
          className="hidden bg-white border-2 border-purple-900 w-full h-full text-center font-semibold rounded-xl absolute inset-0 text-black group-hover:flex items-center justify-center"
          href="/login"
        >
          You must login first
        </a>
      )}
    </button>
  );
}
