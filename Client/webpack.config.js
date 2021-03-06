const path = require("path")

module.exports = {
  entry: "./Main.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname),
    filename: "bundled.js"
  },
  devtool: "source-map",
  mode: "development",
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname),
    hot: true,
    historyApiFallback: { index: "index.html" }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
}
