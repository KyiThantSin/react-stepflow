import React, { useRef, useEffect, useState, useCallback } from "react";
import { StepperProps, StepProps } from "../../types";
import styles from "./Stepper.module.css";
import mergeStyles from "../../utils/classNames";
import StepConnector from "../StepConnector/StepConnector";

const Stepper: React.FC<StepperProps> = ({
  activeStep: initialActiveStep = 0,
  orientation = "horizontal",
  showConnector = true,
  className,
  children,
  connectorColor,
  connectorThickness,
  smoothTransition = false,
  scrollComponent = false,
}) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepContentRefs = useRef<(HTMLDivElement | null)[]>([]); 
  
  useEffect(() => {
    setActiveStep(initialActiveStep);
  }, [initialActiveStep]);

  // filter valid children and convert to array
  const childrenArray = React.Children.toArray(children).filter(Boolean) as React.ReactElement<StepProps>[];

  // reset stepContentRefs array 
  useEffect(() => {
    stepContentRefs.current = stepContentRefs.current.slice(0, childrenArray.length);
  }, [childrenArray.length]);

  // get the active step's component
  const activeStepComponent = childrenArray[activeStep]?.props?.component;

  // scroll Logic 
  const updateActiveStepOnScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const isHorizontal = orientation === "horizontal";
    
    let maxVisiblePercentage = 0;
    let mostVisibleIndex = activeStep; // default 
    
    stepContentRefs.current.forEach((stepRef, index) => {
      if (!stepRef) return;
      
      const stepRect = stepRef.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      let visibleSize = 0;
      let totalSize = 0;

      if (isHorizontal) {
        totalSize = stepRect.width;
        const intersectionStart = Math.max(stepRect.left, containerRect.left);
        const intersectionEnd = Math.min(stepRect.right, containerRect.right);
        visibleSize = intersectionEnd - intersectionStart;
      } else {
        totalSize = stepRect.height;
        const intersectionStart = Math.max(stepRect.top, containerRect.top);
        const intersectionEnd = Math.min(stepRect.bottom, containerRect.bottom);
        visibleSize = intersectionEnd - intersectionStart;
      }

      const visiblePercentage = totalSize > 0 ? (visibleSize / totalSize) * 100 : 0;
      
      // update if a new step is more visible than the current "mostVisibleIndex"
      if (visiblePercentage > maxVisiblePercentage) {
        maxVisiblePercentage = visiblePercentage;
        mostVisibleIndex = index;
      }
    });
    
    if (mostVisibleIndex !== activeStep) {
      setActiveStep(mostVisibleIndex);
    }
  }, [orientation, activeStep]); 

  // scroll listener
  useEffect(() => {
    if (!scrollComponent || !scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', updateActiveStepOnScroll);
    
    return () => {
      container.removeEventListener('scroll', updateActiveStepOnScroll);
    };
  }, [scrollComponent, updateActiveStepOnScroll]);

  // scroll to active step
  useEffect(() => {
    if (!scrollComponent || !scrollContainerRef.current) return;
    
    const stepRef = stepContentRefs.current[activeStep];
    if (!stepRef) return;
    
    const container = scrollContainerRef.current;
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
      // relativeTop = step position - container position (both from viewport top)
      const relativeTop = stepRect.top - containerRect.top;
      
      container.scrollTo({
        top: container.scrollTop + relativeTop, // scroll from current position to relative top
        behavior: 'smooth'
      });
    }
  }, [activeStep, scrollComponent, orientation]);

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
      
      const isLastStep = index === childrenArray.length - 1;

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
        {childrenArray.map((child, index) => {
          // ensure child is a valid React element and has a 'component' prop
          if (!React.isValidElement(child)) return null;
          const childElement = child as React.ReactElement<StepProps>;
          if (!childElement.props.component) return null;
          
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
                stepContentRefs.current[index] = el;
              }}
              className={stepContentClass}>
              {childElement.props.component}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.stepperWrapper}>
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