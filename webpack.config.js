const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
    importLoaders: 2,
    sourceMap: false,
  },
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: 'global',
    importLoaders: 2,
    sourceMap: false,
  },
};

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: ['style-loader', CSSLoader],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: ['style-loader', CSSModuleLoader],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
