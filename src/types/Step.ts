import { ReactNode } from "react";

export interface StepProps {
  index?: number;
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}
