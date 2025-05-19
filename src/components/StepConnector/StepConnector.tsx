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
  style, // inline custom style
}) => {
  const connectorClassName = mergeStyles(
    styles.connector,
    styles[`connector-${orientation}`],
    completed && styles["connector-completed"],
    active && styles["connector-active"],
    disabled && styles["connector-disabled"],
    className,
    "react-stepflow-ui-connector"
  );

  return (
    <div 
        className={connectorClassName} 
        style={style} 
        aria-hidden="true" 
    />
  );
};

export default StepConnector;
