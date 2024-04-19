const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point dari aplikasi Anda
  output: {
    path: path.resolve(__dirname, 'dist'), // Output dari bundle hasil build
    filename: 'bundle.js', // Nama file bundle
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match file JavaScript
        exclude: /node_modules/, // Exclude node_modules dari proses bundling
        use: {
          loader: 'babel-loader', // Gunakan Babel untuk transpilasi JavaScript
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Match file CSS
        use: ['style-loader', 'css-loader'], // Gunakan style-loader dan css-loader
      },
    ],
  },
  devServer: {
    contentBase: './dist', // Direktori untuk server dev
    hot: true, // Aktifkan Hot Module Replacement
    port: 8080, // Port yang digunakan oleh webpack-dev-server
  },
};