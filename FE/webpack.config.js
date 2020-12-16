const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  browsers: ['> 1% in KR'],
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(svg)$/, // .svg 확장자로 마치는 모든 파일
        use: ['@svgr/webpack', 'url-loader'], // 파일 로더를 적용한다
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    historyApiFallback: true,
    host: '127.0.0.1',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      changeOrigin: true,
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new webpack.SourceMapDevToolPlugin({
      exclude: [/node_modules/],
      test: /\.(ts|tsx)/i,
    }),
  ],
};
