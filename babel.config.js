module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        alias: {
          assets: './src/assets',
          styles: './src/styles',
          components: './src/components',
          containers: './src/containers',
          'graphql/': './src/graphql',
          screens: './src/screens',
          mutations: './src/graphql/mutations',
          queries: './src/graphql/queries',
          utils: './src/utils'
        }
      },
    ]
  ]
};
