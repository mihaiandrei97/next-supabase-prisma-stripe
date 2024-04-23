import PricingItem from "./_components/Pricing";
import { products } from "@/data-access/products";
import { getServerSession } from "@/lib/get-server-session";

export default async function PricingPage() {
  const user = await getServerSession();
  const loggedIn = !!user;
  return (
    <div className="flex flex-col">
      <h1 className="text-black dark:text-white text-5xl font-bold text-center">
        Get job-ready faster
      </h1>

      <p className="text-lg leading-8 mt-6 mx-auto text-gray-800 dark:text-gray-300 font-medium text-center max-w-md">
        Become the best version of yourself by improving your coding skills and
        unlocking your potential!
      </p>
      <div className="grid xl:grid-cols-3 gap-8 max-w-full mt-16 mb-24">
        {products.map((product) => {
          return (
            <PricingItem
              key={product.proTier}
              product={product}
              loggedIn={loggedIn}
            />
          );
        })}
      </div>
    </div>
  );
}
