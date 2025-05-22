import React from "react";
import { StepperProps, StepProps } from "../../types";
import styles from "./Stepper.module.css";
import mergeStyles from "../../utils/classNames";
import StepConnector from "../StepConnector/StepConnector";

const Stepper: React.FC<StepperProps> = ({
  activeStep = 0,
  orientation = "horizontal",
  showConnector = true,
  className,
  children,
  connectorColor,
  connectorThickness,
}) => {
  const stepperClassName = mergeStyles(
    styles.stepper,
    styles[orientation],
    className,
    "react-stepflow-ui-stepper"
  );
  //convert children to array
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  return (
    <div
      className={stepperClassName}
      role="group"
      aria-label="Stepper Container">
      {React.Children.map(childrenArray, (child, index) => {
        if (!React.isValidElement(child)) return null;
        // guarnatees child has props
        const childElement = child as React.ReactElement<StepProps>;
        const isLastStep = index === childrenArray?.length - 1;

        const stepProps = {
          ...childElement.props, 
          index,
          active: index === activeStep,
          completed: index < activeStep,
          onClick: childElement.props.onClick
            ? () => childElement.props.onClick?.(index)
            : undefined,
          orientation: childElement.props.orientation ?? orientation,
        };

        return(
          <React.Fragment key={index}>
            {/* steps */}
            {React.cloneElement(childElement, stepProps)} 

            {/* connector */}
            {
              showConnector && !isLastStep && (
                <StepConnector 
                  orientation={orientation}
                  completed={index < activeStep}
                  active={index === activeStep}
                  disabled={childElement.props.disabled}
                  completedColor={connectorColor}
                  activeColor={connectorColor}
                  thickness={connectorThickness}
                />
              )
            }
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default Stepper;