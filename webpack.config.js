// for electron file/s
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const dotenv = require('dotenv')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const mode = process.env.NODE_ENV

module.exports = {
  mode,
  bail: isProd,
  devtool: 'source-map',
  watch: isDev ? true : false,

  target: 'electron-main',

  entry: ['./electron/index.js'],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'electron.js',
  },

  externals: [nodeExternals()],

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(mode),
      ...dotenv.config().parsed,
    }),
  ],
}
