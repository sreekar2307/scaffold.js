const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './index.js',
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '>0.5%, not chrome 49, not ie 10, not safari 5.1',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: 'scaffold.js',
    globalObject: 'this',
    library: 'scaffold',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist'),
  },
};
