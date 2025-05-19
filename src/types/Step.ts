import { ReactNode } from "react";

export interface StepProps {
  index?: number;
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  onClick?: (index: number) => void;
  className?: string;
  circleClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabledClassName?: string;
  orientation?: "horizontal" | "vertical";
}
