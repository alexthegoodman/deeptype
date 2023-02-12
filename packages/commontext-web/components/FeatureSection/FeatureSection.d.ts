import { ReactElement } from "react";

export interface FeatureSectionProps {
  videoSrc: string;
  flip?: boolean;
  headline: ReactElement;
  features: any[];
}
