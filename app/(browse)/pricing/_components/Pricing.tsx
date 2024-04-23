"use client";

import { CheckIcon, ShieldCloseIcon } from "lucide-react";
import { Product } from "@/data-access/products";
import { stripeRedirect } from "@/actions/stripe-redirect";
import PricingButton from "./PricingButton";

interface IPricingItem {
  loggedIn: boolean;
  product: Product;
}

export default function PricingItem({ product, loggedIn }: IPricingItem) {

  return (
    <div
      className="bg-purple-500 dark:bg-purple-800"
    >
      <div

        className="text-slate-100 p-8 rounded-xl w-[400px] max-w-full relative overflow-hidden z-10 h-full"
        key={product.proTier}
      >
        <div
          className="absolute scale-[1.5] blur-3xl w-40 h-40 rounded-full -z-10 transition-opacity duration-300 hidden md:block"
        ></div>

        <h3 className="text-3xl font-bold text-center">
          {product.name}
        </h3>

        <p className="text-purple-100 my-4 text-center">
          {product.description}
        </p>

        <div className="text-5xl mt-8 relative text-center">
          <strong>${product.price / 100}</strong>
        </div>

        <p className="text-purple-100 my-2 text-center text-lg">
          Pay once. <strong>Unlock forever!</strong>
        </p>

        <form action={stripeRedirect}>
          <PricingButton
            product={product}
            loggedIn={loggedIn}
          />
        </form>

        <ul className="space-y-2">
          {product.benefits.map((benefit) => (
            <li
              className={`flex items-center gap-2 ${
                !benefit.available ? "text-gray-200 dark:text-gray-400" : ""
              }`}
              key={benefit.text}
            >
              {benefit.available ? (
                <CheckIcon />
              ) : (
                <span className="text-red-500">
                  <ShieldCloseIcon />
                </span>
              )}
              {benefit.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
