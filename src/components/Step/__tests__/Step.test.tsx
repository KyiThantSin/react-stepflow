import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Step from '../Step';
import '@testing-library/jest-dom';

describe('Step Component', () => {
  it('renders with default props', () => {
    render(<Step index={0} label="Step 1" />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    
    const stepElement = screen.getByText('1').closest('.react-stepflow-ui-step');
    expect(stepElement).toHaveClass('step');
    expect(stepElement).toHaveClass('stepHorizontalLayout');
  });

  it('renders with description when provided', () => {
    render(<Step index={1} label="Step 2" description="Description" />);
    
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('applies active state correctly', () => {
    render(<Step index={2} label="Step 3" active />);
    
    const circle = screen.getByText('3').closest('.react-stepflow-ui-step-circle');
    expect(circle).toHaveClass('circle-active');
  });

  it('applies completed state correctly', () => {
    const { container } = render(<Step index={3} label="Step 4" completed />);
    
    expect(screen.queryByText('4')).not.toBeInTheDocument();
    
    const checkIcon = container.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it('applies error state correctly', () => {
    const { container } = render(<Step index={4} label="Step 5" error />);
    
    const errorIcon = container.querySelector('svg');
    expect(errorIcon).toBeInTheDocument();
  });

  it('handles click events when not disabled', () => {
    const handleClick = jest.fn();
    render(<Step index={5} label="Step 6" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('6'));
    expect(handleClick).toHaveBeenCalledWith(5);
  });

  it('does not trigger click events when disabled', () => {
    const handleClick = jest.fn();
    render(<Step index={6} label="Step 7" disabled onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('7'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with vertical orientation', () => {
    render(<Step index={7} label="Step 8" orientation="vertical" />);
    
    const stepElement = screen.getByText('8').closest('.react-stepflow-ui-step');
    expect(stepElement).toHaveClass('stepVerticalLayout');
  });

  it('renders custom icon when provided', () => {
    const CustomIcon = () => <div data-testid="custom-icon">ICON</div>;
    render(<Step index={8} label="Step 9" icon={<CustomIcon />} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with description when provided', () => {
    render(<Step index={1} label="Step 2" description="This is a test" />);
    
    expect(screen.getByText('This is a test')).toBeInTheDocument();
  });
  
});
