// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',

    [
      'babel-preset-vite',
      {
        env: true, // defaults to true
        glob: false // defaults to true
      }
    ]
  ]
};
