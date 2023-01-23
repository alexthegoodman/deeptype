import { ReactElement } from "react";

export interface PricingItemProps {
    price: number;
    frequency: string;
    btn?: ReactElement;
}
