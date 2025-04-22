const webpack = require('webpack');

module.exports = {
  // your existing config
  plugins: [
    new webpack.DefinePlugin({
      __WS_TOKEN__: JSON.stringify(process.env.WS_TOKEN || '')
    })
  ]
};
