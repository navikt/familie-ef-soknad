import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const publicPath = process.env.PUBLIC_URL || '/';
const brukMockLokalt = process.env.BRUK_MOCK_LOKALT || false;
const kopieresOver = ['filer', 'favicon.ico', 'manifest.json', 'robots.txt'];

const config = {
  mode: 'development',
  cache: true,
  devServer: {
    port: 3000,
    hot: true,
    client: {
      overlay: false,
    },
    open: publicPath,
    proxy: {
      '/api':
        brukMockLokalt === 'true'
          ? 'http://localhost:8092'
          : 'http://localhost:8091',
    },
    devMiddleware: { publicPath: publicPath },
    historyApiFallback: true,
  },
  entry: {
    'familie-ef-soknad': ['./src/index.tsx'],
  },
  output: {
    path: path.join(process.cwd(), 'dev-build'),
    filename: '[name].[contenthash].js',
    publicPath: publicPath,
    clean: true,
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.mjs'],
    fallback: { crypto: false, fs: false, path: false, os: false },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx|ts)?$/,
        exclude: /node_modules/,
        include: path.join(process.cwd(), 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'icss',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.PUBLIC_URL': JSON.stringify(publicPath),
      'process.env.BRUK_MOCK_LOKALT': JSON.stringify(brukMockLokalt),
      'process.env.BRUK_DEV_API': JSON.stringify(
        process.env.BRUK_DEV_API || false
      ),
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new ESLintPlugin({
      extensions: [`ts`, `tsx`],
    }),
    new CopyPlugin({
      patterns: kopieresOver.map((navn) => {
        return {
          from: path.join(process.cwd(), `public/${navn}`),
          to: path.join(process.cwd(), `dev-build/${navn}`),
        };
      }),
    }),

    new HtmlWebpackPlugin({
      publicPath: publicPath,
      template: path.join(process.cwd(), 'public/index.html'),
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: true,
    emitOnErrors: false,
  },
};

export default config;
