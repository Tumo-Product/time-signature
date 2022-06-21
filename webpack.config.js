const webpack = require("webpack");

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/")
    }
  },
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(wav)$/i,
        type: 'asset/inline',
        generator: { // By default the URI says data:audio/wave, this gets the base64 string and adds the correct mime type for wav.
          dataUrl: (content) => `data:audio/wav;base64,${content.toString('base64')}`,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'viewer.html',
      template: 'src/viewer.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'examiner.html',
      template: 'src/viewer.html'
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin(),
  ],
}
