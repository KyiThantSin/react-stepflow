import { ReactNode } from 'react';

// steps
export interface StepProps{
	index?:number;
	active?:boolean;
	completed?:boolean;
	error?:boolean;
	disabled?:boolean;
	icon?:ReactNode;
}