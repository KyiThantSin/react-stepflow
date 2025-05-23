import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepConnector from '../StepConnector';

describe('StepConnector Component', () => {
  it('renders with default horizontal orientation', () => {
    const {container } = render(<StepConnector />);
    const connector = container.firstChild as HTMLDivElement;

    expect(connector).toBeInTheDocument();
    expect(connector).toHaveClass('connector-horizontal');
    expect(connector).toHaveClass('react-stepflow-ui-connector');
  });

  it('renders with vertical orientation when specified', () => {
    const {container } = render(<StepConnector orientation="vertical" />);
    const connector = container.firstChild as HTMLDivElement;
    expect(connector).toHaveClass('connector-vertical');
  });

  it('applies completed styles when completed prop is true', () => {
    const {container } = render(<StepConnector completed={true} />);
    const connector = container.firstChild as HTMLDivElement;
    expect(connector).toHaveClass('connector-completed');
  });

  it('applies active styles when active prop is true', () => {
    const {container } = render(<StepConnector active={true} />);
    const connector = container.firstChild as HTMLDivElement;
    expect(connector).toHaveClass('connector-active');
  });

  it('applies custom thickness when provided', () => {
    // horizontal connector 
    const {container } = render(<StepConnector thickness={2} />);
    const horizontalConnector = container.firstChild as HTMLDivElement;
    expect(horizontalConnector).toHaveStyle({ height: '2rem' });
    
    // vertical connector 
    const { container: verticalContainer } = render(<StepConnector orientation="vertical" thickness="3px" />);
    const verticalConnector = verticalContainer.firstChild as HTMLDivElement;
    expect(verticalConnector).toHaveStyle({ width: '3px' });
  });
});
