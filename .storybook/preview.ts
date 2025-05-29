import type { Preview } from '@storybook/react-vite';
// Import our custom CSS for Storybook
import './preview.css';
// If you have global CSS that needs to be imported for all stories
// import '../src/styles/global.css'; // Adjust this path if your CSS is located elsewhere

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Set layout to centered with no padding to avoid scrollbars
    layout: 'centered',
    // Optional: Add default backgrounds
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f8f8' },
        { name: 'dark', value: '#333333' },
      ],
    },
    // Disable default padding that might cause scrollbars
    docs: {
      story: {
        inline: true,
        iframeHeight: 'auto',
      },
    },
  },
};

export default preview;