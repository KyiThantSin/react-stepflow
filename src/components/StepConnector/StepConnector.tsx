import React from "react";
import { StepConnectorProps } from "../../types";
import mergeStyles from "../../utils/classNames";
import styles from "./StepConnector.module.css";

const StepConnector: React.FC<StepConnectorProps> = ({
  orientation = "horizontal",
  completed = false,
  active = false,
  disabled = false,
  className,
  style,
  completedColor,
  activeColor,
}) => {
  const connectorClassName = mergeStyles(
    styles.connector,
    styles[`connector-${orientation}`],
    completed && !completedColor && styles["connector-completed"],
    active && !activeColor && styles["connector-active"],
    disabled && styles["connector-disabled"],
    className,
    "react-stepflow-ui-connector"
  );

  const dynamicStyle = {
    ...style,
    ...(completed && completedColor && { backgroundColor: completedColor }),
    ...(active && activeColor && { backgroundColor: activeColor }),
  };

  return (
    <div 
      className={connectorClassName} 
      style={dynamicStyle} 
      aria-hidden="true" 
    />
  );
};

export default StepConnector;
