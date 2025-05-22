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
  smoothTransition = false,
  scrollComponent = false,
}) => {
  const stepperClassName = mergeStyles(
    styles.stepper,
    styles[orientation],
    className,
    "react-stepflow-ui-stepper"
  );
  //convert children to array
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  // get the active step's component
  const activeStepComponent = React.Children.toArray(children)
    ?.filter(Boolean)
    ?.map((child) => {
      if (!React.isValidElement(child)) return null;
      const childElement = child as React.ReactElement<StepProps>;
      return childElement.props.component;
    })?.[activeStep];

  const contentContainerClassName = mergeStyles(
    styles.contentContainer,
    smoothTransition && styles.smoothTransition,
    scrollComponent && styles.scrollContent,
    orientation === "horizontal" ? styles.contentBelow : styles.contentBeside,
    "react-stepflow-ui-content-container"
  );

  return (
    <div className={styles.stepperWrapper}>
      <div
        className={stepperClassName}
        role="group"
        aria-label="Stepper Container">
        {React.Children.map(childrenArray, (child, index) => {
          if (!React.isValidElement(child)) return null;
          // guarantees child has props
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
      
      {/* custom component */}
      {activeStepComponent && (
        <div className={contentContainerClassName}>
          {activeStepComponent}
        </div>
      )}
    </div>
  );
};

export default Stepper;