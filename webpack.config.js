const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

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

const DEV_API = process.env.DEV_API ? process.env.DEV_API : 'http://localhost:8080';

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/**': {
          target: DEV_API,
          pathRewrite: { '^/api': '' },
          cookieDomainRewrite: JSON.stringify(DEV_API),
          changeOrigin: true,
          logLevel: 'debug',
          onProxyRes: checkAuth,
      },
    },
    static: {
      directory: './src'
    }
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    })
  ],
};
