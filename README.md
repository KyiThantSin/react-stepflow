<div align="center">
  <h1>React StepFlow</h1>
  <p>A flexible and customizable stepper component for React applications</p>
  
  [![npm](https://img.shields.io/npm/v/@kyits/react-stepflow?style=flat-square)](https://www.npmjs.com/package/@kyits/react-stepflow)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  [![Minzipped Size](https://badgen.net/bundlephobia/minzip/@kyits/react-stepflow?style=flat-square)](https://bundlephobia.com/package/@kyits/react-stepflow)
  [![Bundle Size](https://img.shields.io/badge/bundle%20size-20%20KB-brightgreen?style=flat-square)](https://github.com/KyiThantSin/react-stepflow)
  [![Demo](https://img.shields.io/badge/demo-live-blue?style=flat-square)](https://react-stepflow-demo.vercel.app/)
  
  <!-- <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
    <img src="./demo/horizontal-stepper.png" alt="React StepFlow Horizontal Demo" width="100%" />
    <img src="./demo/vertical-stepper.png" alt="React StepFlow Vertical Demo" width="100%" />
  </div> -->
</div>

## ✨ Features

- **Dual Orientation** - Switch between horizontal and vertical layouts
- **Customizable** - Extensive styling through props and CSS modules
- **Responsive** - Works on all device sizes
- **Accessible** - Built with ARIA attributes and keyboard navigation
- **TypeScript Support** - Full TypeScript definitions included
- **Lightweight** - Only 20KB bundle size with zero dependencies
- **Tree-Shakable** - Import only what you need to minimize bundle size

## 🔍 Live Demo

Check out the live demo to see React StepFlow in action:

👉 **[Live Demo](https://react-stepflow-demo.vercel.app/)**

The demo showcases both horizontal and vertical stepper layouts with various features including:
- Custom icons and styling
- Step navigation with smooth transitions
- Scrollable content areas

## 🚀 Installation

```bash
# npm
npm install @kyits/react-stepflow

# yarn
yarn add @kyits/react-stepflow

# pnpm
pnpm add @kyits/react-stepflow
```

### Tree-Shaking Support

React StepFlow fully supports tree-shaking, allowing you to import only the components you need. This helps reduce your final bundle size even further.

```jsx
// Import only what you need
import { Stepper, Step } from '@kyits/react-stepflow';

// Or import individual components
import Stepper from '@kyits/react-stepflow/dist/components/Stepper';
import Step from '@kyits/react-stepflow/dist/components/Step';
```

## 🛠 Framework Compatibility

| Framework | Support | Notes |
|-----------|---------|-------|
| React | ✅ 16.8+ | Full hooks support |
| Next.js | ✅ 13+ | Both App Router & Pages Router |
| CSS Modules | ✅ Built-in | Scoped styling |
| Inline Styles | ✅ Full support | Via style props |
| CSS-in-JS | ✅ Compatible | Via className props |
| Tailwind CSS | ✅ Compatible | No built-in styles |

> **Note on Next.js App Router**: For features requiring browser APIs (like scroll detection), use the `'use client'` directive in your component file.

## 🎯 Basic Usage

### Basic Horizontal Stepper

```jsx
'use client';
import { useState } from 'react';
import { Stepper, Step } from '@kyits/react-stepflow';

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);

  // Steps configuration
  const steps = [
    { 
      label: 'Personal Info', 
      description: 'Your contact details',
      content: <PersonalInfoForm /> 
    },
    { 
      label: 'Shipping', 
      description: 'Delivery information',
      content: <ShippingForm />
    },
    { 
      label: 'Payment', 
      description: 'Payment method',
      content: <PaymentForm />
    },
    { 
      label: 'Confirmation', 
      description: 'Review your order',
      content: <OrderConfirmation />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Stepper 
        activeStep={activeStep}
        orientation="horizontal"
        smoothTransition
        className="mb-8"
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            label={step.label}
            description={step.description}
            onClick={() => setActiveStep(index)}
            component={step.content}
            className="cursor-pointer hover:bg-gray-50 p-2 rounded"
            labelClassName="font-medium text-gray-800"
            descriptionClassName="text-sm text-gray-500"
          />
        ))}
      </Stepper>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Example form components (simplified)
function PersonalInfoForm() { return <div>Personal Info Form</div>; }
function ShippingForm() { return <div>Shipping Form</div>; }
function PaymentForm() { return <div>Payment Form</div>; }
function OrderConfirmation() { return <div>Order Confirmation</div>; }
```

## 📚 API Reference

### 🎛️ Stepper Component

The main container component that manages the stepper state and layout.

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `activeStep` | `number` | `0` | No | The currently active step index (zero-based) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Controls the layout direction of the stepper |
| `showConnector` | `boolean` | `true` | No | Toggle visibility of connectors between steps |
| `smoothTransition` | `boolean` | `false` | No | Enables smooth animations between steps |
| `scrollComponent` | `boolean` | `false` | Enables scrollable content mode for steps |
| `connectorColor` | `string` | - | No | Custom color for step connectors |
| `connectorThickness` | `string \| number` | - | No | Thickness of step connectors (e.g., `'2px'` or `2`) |
| `className` | `string` | - | No | Additional CSS class for the stepper container |
| `style` | `CSSProperties` | - | No | Inline styles for the stepper container |

### 🔘 Step Component

Represents an individual step in the stepper.

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | Yes | Text label for the step |
| `description` | `string` | - | No | Optional description text below the label |
| `index` | `number` | - | No | Automatically assigned index (handled by Stepper) |
| `active` | `boolean` | `false` | No | Manually control active state |
| `completed` | `boolean` | `false` | No | Mark step as completed |
| `error` | `boolean` | `false` | No | Show error state |
| `disabled` | `boolean` | `false` | No | Disable step interaction |
| `icon` | `ReactNode` | - | No | Custom icon component |
| `component` | `ReactNode` | - | No | Content to display when step is active |
| `onClick` | `(index: number) => void` | - | No | Click handler for step interaction |

#### Styling Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS class for the step container |
| `circleClassName` | `string` | CSS class for the step circle/icon container |
| `labelClassName` | `string` | CSS class for the step label |
| `descriptionClassName` | `string` | CSS class for the step description |
| `circleStyle` | `CSSProperties` | Inline styles for the step circle |
| `activeCircleStyle` | `CSSProperties` | Styles for active state circle |
| `completedCircleStyle` | `CSSProperties` | Styles for completed state circle |
| `errorCircleStyle` | `CSSProperties` | Styles for error state circle |
| `disabledCircleStyle` | `CSSProperties` | Styles for disabled state circle |

## 🎨 Styling

React StepFlow comes with beautiful default styles out of the box, but also provides multiple ways to customize the appearance to match your design system.

### 1. Default Styling

Simply import and use the components - they'll look great with zero configuration:

```jsx
import { Stepper, Step } from '@kyits/react-stepflow';

function MyStepper() {
  return (
    <Stepper activeStep={0}>
      <Step label="Step 1" description="First step" />
      <Step label="Step 2" description="Second step" />
      <Step label="Step 3" description="Final step" />
    </Stepper>
  );
}
```

### 2. Customization Options

#### 2.1 Using Inline Styles

For quick customizations, you can use inline styles:

```jsx
<Stepper 
  style={{ padding: '20px' }}
  connectorStyle={{ backgroundColor: '#e2e8f0' }}
>
  <Step 
    circleStyle={{ backgroundColor: '#f1f5f9' }}
    activeCircleStyle={{ backgroundColor: '#3b82f6' }}
    completedCircleStyle={{ backgroundColor: '#10b981' }}
  />
</Stepper>
```

#### 2.2 Using Tailwind CSS

If you're using Tailwind in your project, you can easily apply utility classes:

```jsx
<Stepper className="p-6 bg-white rounded-lg">
  <Step 
    className="hover:bg-gray-50"
    circleClassName="bg-blue-100 text-blue-600"
    activeCircleClassName="bg-blue-600 text-white"
    labelClassName="text-gray-800"
  />
</Stepper>
```

> **Note**: The default styles will be applied unless you override them with your custom styles or classes.

#### 2.3 Using CSS Classes

All components accept `className` props for custom styling with your preferred CSS solution. This allows you to use any CSS solution of your choice, whether it's:

- Plain CSS
- CSS Modules
- Styled Components
- Emotion
- Or any other CSS-in-JS solution

Example:

```jsx
<Step 
  className="custom-step"
  circleClassName="step-circle"
  labelClassName="step-label"
  descriptionClassName="step-description"
/>
```

## 🌟 Advanced Examples

### Example 1: Multi-step Form

```jsx
function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
      label: 'Account', 
      component: <AccountForm />,
      icon: <UserIcon className="w-5 h-5" />
    },
    { 
      label: 'Profile', 
      component: <ProfileForm />,
      icon: <UserCircleIcon className="w-5 h-5" />
    },
    { 
      label: 'Payment', 
      component: <PaymentForm />,
      icon: <CreditCardIcon className="w-5 h-5" />
    },
    { 
      label: 'Complete', 
      component: <Confirmation />,
      icon: <CheckCircleIcon className="w-5 h-5" />
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Stepper 
        activeStep={activeStep}
        orientation="horizontal"
        className="mb-8 bg-white rounded-xl shadow-sm p-6"
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            label={step.label}
            icon={step.icon}
            onClick={() => !step.disabled && setActiveStep(index)}
            component={step.component}
            className={`px-4 py-3 rounded-lg transition-colors ${
              activeStep === index ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
            circleClassName={`flex items-center justify-center w-8 h-8 rounded-full ${
              activeStep === index 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          />
        ))}
      </Stepper>
      
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (activeStep === steps.length - 1) {
              // Handle form submission
              alert('Form submitted!');
            } else {
              setActiveStep(prev => prev + 1);
            }
          }}
          variant="primary"
        >
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
```

### Example 2: Vertical Timeline

```jsx
function TimelineStepper() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Status</h2>
      <Stepper 
        orientation="vertical"
        className="space-y-8"
        connectorStyle={{
          backgroundColor: '#e2e8f0',
          width: '2px',
          margin: '8px 0 8px 15px'
        }}
      >
        <Step
          label="Order Placed"
          description="May 15, 2023 • 10:30 AM"
          completed={true}
          icon={<ShoppingBagIcon className="w-5 h-5" />}
          circleClassName="w-8 h-8 bg-green-100 text-green-600"
        />
        <Step
          label="Order Confirmed"
          description="May 15, 2023 • 10:35 AM"
          completed={true}
          icon={<CheckCircleIcon className="w-5 h-5" />}
          circleClassName="w-8 h-8 bg-green-100 text-green-600"
        />
        <Step
          label="Shipped"
          description="May 16, 2023 • 9:15 AM"
          active={true}
          icon={<TruckIcon className="w-5 h-5" />}
          circleClassName="w-8 h-8 bg-blue-100 text-blue-600"
        />
        <Step
          label="Out for Delivery"
          description="Expected by EOD"
          disabled={true}
          icon={<ClockIcon className="w-5 h-5" />}
          circleClassName="w-8 h-8 bg-gray-100 text-gray-400"
        />
      </Stepper>
    </div>
  );
}
```

## 🚀 Getting Started with Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/KyiThantSin/react-stepflow.git
   cd react-stepflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Accessibility

The stepper component follows accessibility best practices:

- Uses semantic HTML elements
- Provides proper ARIA labels
- Supports keyboard navigation
- Maintains focus management
- Uses appropriate color contrast

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License is a permissive free software license that allows for reuse of code within proprietary software, provided all copies of the licensed software include a copy of the MIT License terms and the copyright notice. It's one of the most common open source licenses and is generally considered business-friendly.



## 🙏 Acknowledgments

- Built with ❤️ using React and TypeScript

## License

MIT