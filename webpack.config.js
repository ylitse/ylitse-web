const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

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
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'web',
};
