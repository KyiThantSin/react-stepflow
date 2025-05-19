import React from "react";

export interface StepConnectorProps{
    orientation?: "horizontal" | "vertical";
    completed?:boolean;
    active?:boolean;
    disabled?:boolean;
    className?: string;   
    style?: React.CSSProperties; // inline css                
}