const path = require('path');

let libraryName = 'revo-common-select';
const common = {
  entry: {
    [libraryName]: './src/index.ts',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    '@revolist/revogrid',
    /^@revolist\/revogrid\//,
    '@revolist/revo-dropdown',
    '@revolist/revo-dropdown/loader',
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = [{
  ...common,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].umd.cjs',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
}, {
  ...common,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].mjs',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true // Enables experimental support for ESM output
  },
}];
