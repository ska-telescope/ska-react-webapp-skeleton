const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = () => {
  return {
    entry: './src/index.jsx',
    output: {},

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },

    devServer: {
      port: 8090,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },

    module: {
      rules: [
        {
          test: /\.m?js|\.jsx/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },

    devtool: 'source-map',

    plugins: [
      new ModuleFederationPlugin({
        name: 'reactSkeleton',
        filename: 'remoteEntry.js',
        remotes: {
          counterStore: 'counterStore@http://localhost:8094/remoteEntry.js'
        },
        exposes: {
          './ExampleComponent': './src/components/App/App.tsx'
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: deps['react']
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: deps['react-dom']
          },
          i18next: {
            eager: true,
            singleton: true,
            requiredVersion: deps.i18next
          },
          'react-i18next': {
            eager: true,
            singleton: true,
            requiredVersion: deps['react-i18next']
          },
          'i18next-browser-languagedetector': {
            eager: true,
            singleton: true,
            requiredVersion: deps['i18next-browser-languagedetector']
          },
          'i18next-http-backend': {
            eager: true,
            singleton: true,
            requiredVersion: deps['i18next-http-backend']
          },
          // Material UI
          '@mui/material': { singleton: true, requiredVersion: 'auto', eager: true },
          '@emotion/react': { singleton: true, requiredVersion: 'auto', eager: true },
          '@emotion/styled': { singleton: true, requiredVersion: 'auto', eager: true },

          '@ska-telescope/ska-gui-components': {
            requiredVersion: 'auto',
            eager: true
          },
          moment: {
            eager: true,
            singleton: true,
            requiredVersion: deps.moment
          }
        }
      }),
      new HtmlWebPackPlugin({
        template: './public/index.html'
      })
    ]
  };
};
