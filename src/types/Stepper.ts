import { ReactNode } from "react";
export interface StepperProps {
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: ReactNode;
  showConnector?: boolean;
  connectorColor?: string;
  connectorThickness?: string | number;
}
