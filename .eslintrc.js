// module.exports = {
//   root: true,
//   extends: '@react-native-community',
// };

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  plugins: ['react-hooks'],
  rules: {
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'import/prefer-default-export': 'off',
    'arrow-parens': ["error", "as-needed"],
    'no-unused-expressions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off'
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          assets: './src/assets',
          styles: './src/styles',
          components: './src/components',
          'graphql/': './src/graphql',
          screens: './src/screens',
          mutations: './src/graphql/mutations',
          queries: './src/graphql/queries',
          utils: './src/utils'
        }
      }
    }
  },
  globals: {
    fetch: false
  }
}
