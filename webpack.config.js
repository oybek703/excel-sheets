const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');
const TerserPlugin=require('terser-webpack-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');
console.log('NODE_ENV:', process.env.NODE_ENV);
const isDev=process.env.NODE_ENV==='development';
const isProd=!isDev;
const jsLoaders=(loader)=>{
  const loaders=[
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      },
    },
  ];
  if (isDev) {
    loaders.push(loader);
  }
  return loaders;
};
module.exports={
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    filename: 'bundle.[hash:4].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash:4].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/fontawesome/all.min.js'),
          to: path.resolve(__dirname, 'dist/')
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: jsLoaders('eslint-loader'),
        exclude: '/node_modules',
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(rtf|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4000,
    open: true,
  },
  devtool: isDev ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.sass', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    },
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};
