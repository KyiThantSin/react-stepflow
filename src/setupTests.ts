import '@testing-library/jest-dom';

// Mock CSS modules
const mockCssModule = new Proxy(
  {},
  {
    get: function (target, prop) {
      return prop;
    },
  }
);

export default mockCssModule;
