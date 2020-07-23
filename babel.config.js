module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@models': './src/models',
          '@services': './src/services',
          '@middlewares': './src/middlewares',
          '@errors': './src/errors',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
