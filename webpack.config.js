// for electron file/s
require('dotenv-expand')(require('dotenv').config())
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const mode = process.env.NODE_ENV

const NODE_APP = /^(REACT_APP|NODE_APP)_/i

const envVars = Object.keys(process.env)
  .filter(key => NODE_APP.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key]
      return env
    },
    {
      NODE_ENV: process.env.NODE_ENV || 'development',
    }
  )

const envVarsStringified = {
  'process.env': Object.keys(envVars).reduce((env, key) => {
    env[key] = JSON.stringify(envVars[key])
    return env
  }, {}),
}

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

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [new webpack.DefinePlugin(envVarsStringified)],

  node: {
    __dirname: false,
    __filename: false,
  },
}
