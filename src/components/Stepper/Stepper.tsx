import React from "react";
import { StepperProps, StepProps } from "../../types";
import styles from "./Stepper.module.css";
import mergeStyles from "../../utils/classNames";

const Stepper:React.FC<StepperProps> = ({
	activeStep = 0,
	orientation = "horizontal",
	className,
	children
}) => {
	const stepperClassName = mergeStyles(
		styles.stepper, 
		styles[orientation], 
		className,
		"react-stepflow-ui-stepper"
	)
	//convert children to array
	const childrenArray = React.Children.toArray(children).filter(Boolean);
	return(
		<div
			className={stepperClassName}
			role="group"
			aria-label="Stepper Container"
		>
			{React.Children.map(childrenArray, (child, index) => {
				if(!React.isValidElement(child)) return null;
				// guarnatees child has props
				const childElement = child as React.ReactElement<StepProps>;

				const stepProps = {
					index,
					active: index === activeStep,
					completed: index < activeStep,
					onClick:() => childElement.props.onClick?.(index),
					...childElement.props,
				}
				//override
				return React.cloneElement(childElement, stepProps);
			})}
		</div>
	)
};

export default Stepper;