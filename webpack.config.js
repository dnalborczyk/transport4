const { lib } = require('serverless-webpack')

module.exports = {
  entry: lib.entries,
  externals: ['encoding'], // used by node-fetch @.x
  // mode: 'development',
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
        test: /\.ts$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['main'],
  },
  target: 'node',
}
