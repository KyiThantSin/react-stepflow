import storybook from "eslint-plugin-storybook";

export default [{
  ignores: ['dist/**', 'node_modules/**'],
}, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    '@typescript-eslint': await import('@typescript-eslint/eslint-plugin'),
    'react': await import('eslint-plugin-react'),
    'react-hooks': await import('eslint-plugin-react-hooks'),
    'prettier': await import('eslint-plugin-prettier'),
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}, ...storybook.configs["flat/recommended"]];
