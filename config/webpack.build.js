import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const publicPath = process.env.PUBLIC_URL || '/';
const config = {
  mode: 'production',
  entry: {
    'familie-ef-soknad': ['babel-polyfill', './src/index.tsx'],
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].[contenthash].js',
    publicPath: publicPath,
    clean: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.mjs'],
    fallback: { crypto: false, fs: false, path: false, os: false },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx|ts)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: path.join(process.cwd(), 'src'),
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        include: path.join(process.cwd(), 'src'),
        loader: 'ts-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
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
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader',
      // },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PUBLIC_URL': JSON.stringify(publicPath),
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin({
      extensions: [`ts`, `tsx`],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), 'public/filer'),
          to: path.join(process.cwd(), 'build/filer'),
        },
        {
          from: path.join(process.cwd(), 'public/favicon.ico'),
          to: path.join(process.cwd(), 'build/favicon.ico'),
        },
        {
          from: path.join(process.cwd(), 'public/manifest.json'),
          to: path.join(process.cwd(), 'build/manifest.json'),
        },
        {
          from: path.join(process.cwd(), 'public/robots.txt'),
          to: path.join(process.cwd(), 'build/robots.txt'),
        },
        {
          from: path.join(process.cwd(), 'public/robots.txt'),
          to: path.join(process.cwd(), 'build/robots.txt'),
        },
      ],
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
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
    minimizer: [new TerserPlugin()],
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
