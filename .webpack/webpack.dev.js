const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './public/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3332
  },
  output: {
    path: path.resolve(__dirname, '../distServe'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
      appMountId: 'app',
      "exJs": [ 
        '<script type="text/javascript" src="dist/index.js"></script>',
        // '<script type="module" src="http://localhost:3333/build/revo-dropdown.esm.js"></script>'
      ],
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@revolist/revo-dropdown': path.resolve(__dirname, '../revodropdown'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
