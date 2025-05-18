import React from "react";
import { StepProps } from "../../types";
import mergeStyles from "../../utils/classNames";
import styles from "./Step.module.css";
import { CheckIcon, ErrorIcon } from "../Icons";

const Step: React.FC<StepProps> = ({
  index,
  active = false,
  completed = false,
  error,
  disabled = false,
  icon,
  ...props
}) => {
  let status: "disabled" | "error" | "active" | "completed" | "default" =
    "default";

  if (error) status = "error";
  else if (active) status = "active";
  else if (completed) status = "completed";
  else if (disabled) status = "disabled";
  else status = "default";

  const stepClassName = mergeStyles(
    styles.step,
    styles[`step-${status}`],
    disabled && styles.disabled,
    "react-stepflow-ui-step"
  );

  const circleClass = mergeStyles(
    styles.circle,
    styles[`circle-${status}`],
    "react-stepflow-ui-step-circle"
  );

  return (
    <div className={stepClassName} {...props}>
      <div className={circleClass} aria-disabled={disabled}>
        {icon ? (
          icon
        ) : completed ? (
          <CheckIcon />
        ) : error ? (
          <ErrorIcon />
        ) : (
          <span>{index !== undefined ? index + 1 : ""}</span>
        )}
      </div>
    </div>
  );
};

export default Step;
