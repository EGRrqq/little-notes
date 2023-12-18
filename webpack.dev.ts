import { merge } from "webpack-merge";
import base from "./webpack.base";

// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";

export default merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  optimization: {
    runtimeChunk: "single",
  },
});
