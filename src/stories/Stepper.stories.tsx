import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Stepper from '../components/Stepper/Stepper';
import Step from '../components/Step/Step';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    activeStep: { control: 'number' },
    orientation: { 
      control: 'select', 
      options: ['horizontal', 'vertical'] 
    },
    showConnector: { control: 'boolean' },
    connectorColor: { control: 'color' },
    connectorThickness: { control: 'number' },
    smoothTransition: { control: 'boolean' },
    scrollComponent: { control: 'boolean' },
  },
} as Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalStepper: Story = {
  render: (args) => (
    <div className="responsive-container">
      <Stepper 
        activeStep={args.activeStep} 
        orientation={args.orientation} 
        showConnector={args.showConnector}
        className="wider-stepper"
      >
        <Step label="Step 1" description="First step description" className="wider-step" />
        <Step label="Step 2" description="Second step description" className="wider-step" />
        <Step label="Step 3" description="Third step description" className="wider-step" />
      </Stepper>
    </div>
  ),
  args: {
    activeStep: 0,
    orientation: 'horizontal',
    showConnector: true,
  },
};

export const VerticalStepper: Story = {
  render: (args) => (
    <div className="responsive-container">
      <Stepper 
        activeStep={args.activeStep} 
        orientation={args.orientation} 
        showConnector={args.showConnector}
      >
        <Step label="Step 1" description="First step description" />
        <Step label="Step 2" description="Second step description" />
        <Step label="Step 3" description="Third step description" />
      </Stepper>
    </div>
  ),
  args: {
    activeStep: 0,
    orientation: 'vertical',
    showConnector: true,
  },
};

export const InteractiveStepper: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(0);
    
    const handleNext = () => {
      setActiveStep((prevStep) => Math.min(prevStep + 1, 2));
    };
    
    const handleBack = () => {
      setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };
    
    const handleStepClick = (index: number) => {
      setActiveStep(index);
    };
    
    return (
      <div className="responsive-container interactive-container">
        <Stepper 
          activeStep={activeStep} 
          orientation="horizontal" 
          showConnector={true}
          className="wider-stepper"
        >
          <Step 
            label="Step 1" 
            description="First step" 
            onClick={handleStepClick} 
            className="wider-step"
          />
          <Step 
            label="Step 2" 
            description="Second step" 
            onClick={handleStepClick} 
            className="wider-step"
          />
          <Step 
            label="Step 3" 
            description="Third step" 
            onClick={handleStepClick} 
            className="wider-step"
          />
        </Stepper>
        
        <div className="interactive-controls">
          <button 
            onClick={handleBack} 
            disabled={activeStep === 0}
            className={`control-button ${activeStep === 0 ? 'disabled-button' : 'active-button'}`}
          >
            Back
          </button>
          <button 
            onClick={handleNext}
            disabled={activeStep === 2}
            className={`control-button ${activeStep === 2 ? 'disabled-button' : 'active-button'}`}
          >
            Next
          </button>
        </div>
      </div>
    );
  },
  args: {
    activeStep: 0,
  },
  parameters: {
    controls: { exclude: ['activeStep'] },
  },
};

export const StepperWithStates: Story = {
  render: (args) => (
    <div className="responsive-container">
      <Stepper 
        activeStep={args.activeStep} 
        orientation={args.orientation} 
        showConnector={args.showConnector}
        className="wider-stepper"
      >
        <Step 
          label="Completed" 
          description="This step is done" 
          completed={true} 
          className="wider-step"
        />
        <Step 
          label="Active" 
          description="Current step" 
          active={true} 
          className="wider-step"
        />
        <Step 
          label="Error" 
          description="Something went wrong" 
          error={true} 
          className="wider-step"
        />
        <Step 
          label="Disabled" 
          description="Cannot proceed" 
          disabled={true} 
          className="wider-step"
        />
      </Stepper>
    </div>
  ),
  args: {
    activeStep: 1,
    orientation: 'horizontal',
    showConnector: false,
  },
};

export const ScrollableStepper: Story = {
  render: (args) => (
    <div className="mobile-responsive-container" style={{
      width: '100%',
      maxWidth: '800px',
      height: '500px', 
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <Stepper 
        activeStep={args.activeStep} 
        orientation={args.orientation} 
        showConnector={args.showConnector}
        scrollComponent={args.scrollComponent}
      >
        <Step 
          label="Step 1" 
          description="First step" 
          component={
            <div style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Step 1 Content</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>This is the content for step 1. The content will adapt to different screen sizes.</p>
            </div>
          } 
        />
        <Step 
          label="Step 2" 
          description="Second step" 
          component={
            <div style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Step 2 Content</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>This is the content for step 2. The content will adapt to different screen sizes.</p>
            </div>
          } 
        />
        <Step 
          label="Step 3" 
          description="Third step" 
          component={
            <div style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Step 3 Content</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>This is the content for step 3. The content will adapt to different screen sizes.</p>
            </div>
          } 
        />
      </Stepper>
    </div>
  ),
  args: {
    activeStep: 0,
    orientation: "horizontal",
    showConnector: true,
    scrollComponent: true,
    connectorThickness: 1
  },
};
