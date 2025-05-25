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
  orientation,
  circleStyle,
  activeCircleStyle,
  completedCircleStyle,
  errorCircleStyle,
  disabledCircleStyle,
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
    orientation === "vertical" ? styles.stepVerticalLayout : styles.stepHorizontalLayout,
    styles[`step-${status}`],
    isMinimal && styles["step-minimal"],
    disabled && styles.disabled,
    disabled && disabledClassName,
    !disabled && onClick && "cursor-pointer",
    className,
    "react-stepflow-ui-step"
  );

  const circleClass = mergeStyles(
    styles.circle,
    styles[`circle-${status}`],
    circleClassName,
    "react-stepflow-ui-step-circle"
  );

  const mergedCircleStyle = {
    ...circleStyle,
    ...(active && activeCircleStyle),
    ...(completed && completedCircleStyle),
    ...(error && errorCircleStyle),
    ...(disabled && disabledCircleStyle),
  };

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
      <button
        type="button"
        className={circleClass}
        style={mergedCircleStyle}
        onClick={() => {
          if (!disabled && onClick && index !== undefined) {
            onClick(index);
          }
        }}
        disabled={disabled}
        aria-label={label ? `Step ${index !== undefined ? index + 1 : ""}: ${label}` : `Step ${index !== undefined ? index + 1 : ''}`}>
        {icon ? (
          icon
        ) : completed ? (
          <CheckIcon />
        ) : error ? (
          <ErrorIcon />
        ) : (
          <span>{index !== undefined ? index + 1 : ""}</span>
        )}
      </button>

      <div
        className={mergeStyles(
          styles.textContainer,
          orientation === "vertical" ? styles.textConfigRight : styles.textConfigBelow
        )}>
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
