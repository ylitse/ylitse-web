/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const redirect = (res, loc) => {
  res.statusCode = 302;
  res.statusMessage = 'Found';
  res.headers.location = loc;
};

const checkAuth = (res, req) => {
  if (req.url !== '/login' && [401].includes(res.statusCode)) {
    // not logged in, redirect to login page
    redirect(res, '/login');
  }
};

const DEV_API = process.env.DEV_API
  ? process.env.DEV_API
  : 'http://localhost:8080';

module.exports = {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        changeOrigin: true,
        cookieDomainRewrite: JSON.stringify(DEV_API),
        logLevel: 'debug',
        onProxyRes: checkAuth,
        pathRewrite: { '^/api': '' },
        target: DEV_API,
      },
    },
    static: {
      directory: './src',
    },
  },
  devtool: 'inline-source-map',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),

    new CopyWebpackPlugin({ patterns: [
      {
        from: '**/*',
        context: path.resolve(__dirname, 'src', 'static'),
      },
      {
        from: 'login/**/*',
        context: path.resolve(__dirname, 'src'),
      },
      {
        from: 'register/**/*',
        context: path.resolve(__dirname, 'src'),
      },
    ]}),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'web',
};
