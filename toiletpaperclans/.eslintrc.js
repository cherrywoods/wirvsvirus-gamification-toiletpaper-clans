module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _ScoreTable: './src/components/ScoreTable',
          _navigations: './src/navigations',
          _hooks: './src/hooks',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _utilities: './src/utilities',
        },
      },
    },
  },
  rules: {
    'prettier/prettier': 0,
    'indent': ['error', 2],
    'react-native/no-inline-styles': 'error'
  }
};
