import { ReactNode } from "react";

export interface ScrollStepperProps {
  steps: ReactNode[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  stepperClassName?: string;
  contentClassName?: string;
  showConnector?: boolean;
  connectorColor?: string;
  connectorThickness?: string | number;
  initialStep?: number;
  smoothTransition?: boolean;
  enableKeyboardNavigation?: boolean;
  onStepChange?: (index: number) => void;
  stepLabels?: string[];
  stepDescriptions?: string[];
}
