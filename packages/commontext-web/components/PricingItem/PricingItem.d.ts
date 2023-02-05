import { ReactElement } from "react";

export interface PricingItemProps {
  price: number | string;
  frequency?: string;
  btn?: ReactElement;
  items?: string[];
}
