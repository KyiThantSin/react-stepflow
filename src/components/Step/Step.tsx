import React from "react";
import { StepProps } from "../../types";
import mergeStyles from "../../utils/classNames";
import styles from "./Step.module.css";
import { CheckIcon, ErrorIcon } from "../Icons";

const Step: React.FC<StepProps> = ({
  label,
  index,
  active = false,
  completed = false,
  error = false,
  disabled = false,
  icon,
  description,
  children,
  onClick,
  className,
  circleClassName,
  labelClassName,
  descriptionClassName,
  disabledClassName,
  ...props
}) => {
  let status: "disabled" | "error" | "active" | "completed" | "default" =
    "default";

  if (error) status = "error";
  else if (active) status = "active";
  else if (completed) status = "completed";
  else if (disabled) status = "disabled";
  else status = "default";

  const isMinimal = !icon && index === undefined;
  
  const stepClassName = mergeStyles(
    styles.step,
    styles[`step-${status}`],
    isMinimal && styles["step-minimal"],
    disabled && styles.disabled,
    disabled && disabledClassName,
    className,
    "react-stepflow-ui-step"
  );
  
  const circleClass = mergeStyles(
    styles.circle,
    styles[`circle-${status}`],
    circleClassName,
    "react-stepflow-ui-step-circle"
  );
  
  const labelClass = mergeStyles(
    styles.label,
    styles[`label-${status}`],
    labelClassName,
    "react-stepflow-ui-step-label"
  );
  
  const descriptionClass = mergeStyles(
    styles.description,
    styles[`description-${status}`],
    descriptionClassName,
    "react-stepflow-ui-step-description"
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

      <div className={styles.textContainer}>
        {label && <div className={labelClass}>{label}</div>}
        {description && <div className={descriptionClass}>{description}</div>}
      </div>

      {children && (
        <div
          className={mergeStyles(
            styles.content,
            "react-stepflow-ui-step-content"
          )}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Step;
