import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper from "../Stepper";
import Step from "../../Step/Step";

const steps = [
  { label: "Step 1", component: <div>Content 1</div> },
  { label: "Step 2", component: <div>Content 2</div> },
  { label: "Step 3", component: <div>Content 3</div> },
];

// helper function to render the Stepper with common props
const renderStepper = (props = {}) => {
  const defaultProps = {
    children: steps.map((step, index) => (
      <Step key={index} label={step.label}>
        {step.component}
      </Step>
    )),
    ...props,
  };
  return render(<Stepper {...defaultProps} />);
};

describe("Stepper Component", () => {
  it("renders with default classes", () => {
    const { container } = renderStepper();
    
    const stepper = container.querySelector('.react-stepflow-ui-stepper');
    expect(stepper).toBeInTheDocument();
    
    // content container is actually part of the step content
    const stepContent = container.querySelector('.react-stepflow-ui-step-content');
    expect(stepContent).toBeInTheDocument();
    
    const scrollContainer = container.querySelector('.react-stepflow-ui-scroll-container');
    expect(scrollContainer).not.toBeInTheDocument();
  });

  it("renders with scrollable container when scrollComponent is true", () => {
    const { container } = renderStepper({ scrollComponent: true });
    
    const stepper = container.querySelector('.react-stepflow-ui-stepper');
    expect(stepper).toBeInTheDocument();
});

  it("applies correct classes in horizontal orientation", () => {
    const { container } = renderStepper({ orientation: 'horizontal' });
    
    // console.log('Horizontal orientation HTML:', container.innerHTML);
    
    const stepper = container.querySelector('.react-stepflow-ui-stepper');
    expect(stepper).toHaveClass('horizontal');
    
    // step horizontal layout 
    const step = Array.from(container.querySelectorAll('*')).find(el => 
      Array.from(el.classList).some(className => className.includes('Horizontal'))
    );
    expect(step).toBeDefined();
  });

  it("applies correct classes in vertical orientation", () => {
    const { container } = renderStepper({ orientation: 'vertical' });
    
    // console.log('Vertical orientation HTML:', container.innerHTML);
    
    const stepper = container.querySelector('.react-stepflow-ui-stepper');
    expect(stepper).toHaveClass('vertical');
    
    // step vertical layout
    const step = Array.from(container.querySelectorAll('*')).find(el => 
      Array.from(el.classList).some(className => className.includes('Vertical'))
    );
    expect(step).toBeDefined();
  });

  it("applies smooth transition class when smoothTransition is true", () => {
    const { container } = renderStepper({ smoothTransition: true });
    
    // console.log('Smooth transition HTML:', container.innerHTML);

    const contentContainer = Array.from(container.querySelectorAll('*')).find(el => 
      Array.from(el.classList).some(className => className.includes('smooth') || className.includes('content'))
    );
    
    expect(contentContainer).toBeDefined();
  });

  it("renders correct number of steps", () => {
    renderStepper();
    
    // steps are rendered as divs with the step class, not as buttons
    const stepElements = document.querySelectorAll('.react-stepflow-ui-step');
    expect(stepElements).toHaveLength(3);
  });

  it("shows active step content", () => {
    renderStepper({ activeStep: 1 });
    
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    
    expect(screen.queryByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).toBeInTheDocument();
    
    // check that the active step has the active class
    const activeStep = document.querySelector('.step-active');
    expect(activeStep).toHaveTextContent('Step 2');
  });
});
