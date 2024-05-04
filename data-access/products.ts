import user, {proTierEnum} from "@/db/schema/user";
type ProTier = typeof proTierEnum.enumValues[number]

export type Product = {
  proTier: ProTier;
  name: string;
  description: string;
  price: number;
  color: string;
  benefits: { text: string; available: boolean }[];
  role: string;
};

export const products: Product[] = [
  {
    proTier: proTierEnum.enumValues[0],
    name: "Basic",
    description: "Basic product with essential features",
    price: 2990,
    color: "#804edd",
    benefits: [
      { text: "Access to basic features", available: true },
      { text: "24/7 customer support", available: true },
      { text: "Exclusive discounts", available: false },
      { text: "Priority customer support", available: false },
      { text: "Early access to new releases", available: false },
      { text: "VIP customer support", available: false },
      { text: "Personalized recommendations", available: false },
    ],
    role: "pro_basic",
  },
  {
    proTier: proTierEnum.enumValues[1],
    name: "Gold",
    description: "Premium product with additional features",
    price: 5999,
    color: "#eab308",
    benefits: [
      { text: "Access to basic features", available: true },
      { text: "24/7 customer support", available: true },
      { text: "Exclusive discounts", available: true },
      { text: "Priority customer support", available: true },
      { text: "Early access to new releases", available: false },
      { text: "VIP customer support", available: false },
      { text: "Personalized recommendations", available: false },
    ],
    role: "pro_gold",
  },
  {
    proTier: proTierEnum.enumValues[2],
    name: "Platinum",
    description: "Top-tier product with exclusive features",
    price: 9999,
    color: "#3b82f6",
    benefits: [
      { text: "Access to basic features", available: true },
      { text: "24/7 customer support", available: true },
      { text: "Exclusive discounts", available: true },
      { text: "Priority customer support", available: true },
      { text: "Early access to new releases", available: true },
      { text: "VIP customer support", available: true },
      { text: "Personalized recommendations", available: true },
    ],
    role: "pro_platinum",
  },
];
