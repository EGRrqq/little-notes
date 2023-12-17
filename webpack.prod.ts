import { merge } from "webpack-merge";
import base from "./webpack.base";

export default merge(base, {
  mode: "production",
  devtool: "source-map",
});
