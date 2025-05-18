import React from "react";
import { StepProps } from "../../types";

const Step: React.FC<StepProps> = ({
  index,
  active = false,
  completed = false,
  error,
  disabled = false,
  icon,
}) => {
    let status: 'disabled' | 'error' | 'active' | 'completed' | 'default' = 'default';
    
    if (error) status = 'error';
    else if (active) status = 'active';
    else if (completed) status = 'completed';
    else if(disabled) status = 'disabled';
    else status = 'default';

    return (<></>)              
};

export default Step;
