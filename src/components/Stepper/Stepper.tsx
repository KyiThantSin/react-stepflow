import React, { useRef, useEffect, useState } from "react";
import { StepperProps, StepProps } from "../../types";
import styles from "./Stepper.module.css";
import mergeStyles from "../../utils/classNames";
import StepConnector from "../StepConnector/StepConnector";

const Stepper: React.FC<StepperProps> = ({
  activeStep: externalActiveStep = 0,
  orientation = "horizontal",
  showConnector = true,
  className,
  children,
  connectorColor,
  connectorThickness,
  smoothTransition = false,
  scrollComponent = false,
}) => {
  const [internalActiveStep, setInternalActiveStep] = useState(externalActiveStep);
  
  // for scroll component, use internal state to track the visible step
  // for non-scroll component, use the external prop directly
  const activeStep = scrollComponent ? internalActiveStep : externalActiveStep;
  
  useEffect(() => {
    setInternalActiveStep(externalActiveStep);
  }, [externalActiveStep]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepContentRefs = useRef<(HTMLDivElement | null)[]>([]); 

  // filter valid children and convert to array
  const childrenArray = React.Children.toArray(children)?.filter(Boolean) as React.ReactElement<StepProps>[];

  // get the active step's component
  const activeStepComponent = childrenArray?.[activeStep]?.props?.component;

  // during scrolling
  const calculateMostVisibleStep = (container: HTMLDivElement) => {
    if (!container) {
      return activeStep;
    }
    
    const isHorizontal = orientation === "horizontal";
    let maxVisiblePercentage = 0;
    let mostVisibleIndex = activeStep; // default
    
    stepContentRefs.current?.forEach((stepRef, index) => {
      if (!stepRef) return;
      
      const stepRect = stepRef.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      let visibleSize = 0;
      let totalSize = 0;

      if (isHorizontal) {
        totalSize = stepRect?.width;
        const intersectionStart = Math.max(stepRect?.left, containerRect?.left);
        const intersectionEnd = Math.min(stepRect?.right, containerRect?.right);
        visibleSize = intersectionEnd - intersectionStart;
      } else {
        totalSize = stepRect?.height;
        const intersectionStart = Math.max(stepRect?.top, containerRect?.top);
        const intersectionEnd = Math.min(stepRect?.bottom, containerRect?.bottom);
        visibleSize = intersectionEnd - intersectionStart;
      }

      const visiblePercentage = totalSize > 0 ? (visibleSize / totalSize) * 100 : 0;
      
      if (visiblePercentage > maxVisiblePercentage) {
        maxVisiblePercentage = visiblePercentage;
        mostVisibleIndex = index;
      }
    });
    
    return mostVisibleIndex;
  };

  const scrollToActiveStep = (container: HTMLDivElement) => {
    const stepRef = stepContentRefs?.current[activeStep];
    if (!stepRef) return;
    
    const isHorizontal = orientation === "horizontal";
    
    if (isHorizontal) {
      stepRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    } else {
      const containerRect = container.getBoundingClientRect();
      const stepRect = stepRef.getBoundingClientRect();
      const relativeTop = stepRect?.top - containerRect?.top;
      
      container.scrollTo({
        top: container.scrollTop + relativeTop,
        behavior: 'smooth'
      });
    }
  };
  
  // scroll logic
  useEffect(() => {
    if (!scrollComponent || !scrollContainerRef?.current) return;
    
    const container = scrollContainerRef.current;
    
    const updateActiveStepOnScroll = () => {
      const mostVisibleIndex = calculateMostVisibleStep(container);
      if (mostVisibleIndex !== activeStep) {
        setInternalActiveStep(mostVisibleIndex);
      }
    };
    
    container.addEventListener('scroll', updateActiveStepOnScroll);
    scrollToActiveStep(container);
    
    return () => {
      container.removeEventListener('scroll', updateActiveStepOnScroll);
    };
  }, [activeStep, orientation, scrollComponent, internalActiveStep]);

  const stepperClassName = mergeStyles(
    styles.stepper,
    styles[orientation],
    className,
    "react-stepflow-ui-stepper"
  );

  const contentContainerClassName = mergeStyles(
    styles.contentContainer,
    smoothTransition && styles.smoothTransition,
    !scrollComponent && orientation === "horizontal" ? styles.contentBelow : styles.contentBeside,
    "react-stepflow-ui-content-container"
  );
  
  const scrollContainerClassName = mergeStyles(
    styles.scrollContainer,
    orientation === "horizontal" ? styles.scrollContainerHorizontal : styles.scrollContainerVertical,
    "react-stepflow-ui-scroll-container"
  );

  const renderSteps = () => {
    return React.Children.map(childrenArray, (child, index) => {
      if (!React.isValidElement(child)) return null;
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
        className: scrollComponent 
          ? mergeStyles(childElement.props.className, styles.stepSpacing)
          : childElement.props.className
      };

      return (
        <React.Fragment key={index}>
          {React.cloneElement(childElement, stepProps)} 
          {showConnector && !isLastStep && (
            <StepConnector 
              orientation={orientation}
              completed={index < activeStep}
              active={index === activeStep}
              disabled={childElement.props.disabled}
              completedColor={connectorColor}
              activeColor={connectorColor}
              thickness={connectorThickness}
            />
          )}
        </React.Fragment>
      );
    });
  };

  const renderScrollableContent = () => {
    return (
      <div 
        ref={scrollContainerRef}
        className={scrollContainerClassName}>
        {childrenArray?.map((child, index) => {
          // ensure child is a valid React element
          if (!React.isValidElement(child)) return null;
          const childElement = child as React.ReactElement<StepProps>;
          
          // check for missing component prop in development
          if (!childElement.props.component) {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(
                `Step at index ${index} is missing the required 'component' prop and will not be rendered. ` +
                'Please provide a component to render for this step when using scrollComponent={true}.'
              );
            }
            return null;
          }
          
          const isActive = index === activeStep;
          const isNextStep = index === activeStep + 1; // preview styling
          const stepContentClass = mergeStyles(
            styles.stepContent,
            orientation === "horizontal" ? styles.stepContentHorizontal : styles.stepContentVertical,
            isActive ? styles.activeStep : isNextStep ? styles.previewStep : "hidden"
          );
          
          return (
            <div 
              key={index}
              ref={(el: HTMLDivElement | null) => {
                if (stepContentRefs?.current?.length <= childrenArray?.length) {
                  stepContentRefs.current = stepContentRefs.current?.slice(0, childrenArray?.length);
                }
                stepContentRefs.current[index] = el;
              }}
              className={stepContentClass}>
              {childElement.props?.component}
            </div>
          );
        })}
      </div>
    );
  };

  const stepperWrapperClassName = mergeStyles(
    styles.stepperWrapper,
    styles[`stepperWrapper${orientation?.charAt(0)?.toUpperCase() + orientation?.slice(1)}`],
    "react-stepflow-ui-stepper-wrapper"
  );

  return (
    <div className={stepperWrapperClassName}>
      <div
        className={stepperClassName}
        role="group"
        aria-label="Stepper Container">
        {renderSteps()}
      </div>
      
      {activeStepComponent && (
        scrollComponent ? (
          renderScrollableContent()
        ) : (
          <div className={contentContainerClassName}>
            {activeStepComponent}
          </div>
        )
      )}
    </div>
  );
};

export default Stepper;