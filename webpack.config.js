const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const plugins = [];

if (NODE_ENV === 'production') {
  plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 5,
        compress: true,
        comments: false,
        mangle: false,
      },
    })
  );
}

module.exports = {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'client', 'app.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css/style.css',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'client'), 'node_modules'],
  },
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
};
