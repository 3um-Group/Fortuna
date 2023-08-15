const rewire = require("rewire");
const defaults = rewire("react-scripts/scripts/start.js");
const config = defaults.__get__("config");

config.resolve.fallback = {
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("stream-browserify"),
  assert: require.resolve("assert"),
  http: require.resolve("stream-http"),
  https: require.resolve("https-browserify"),
  os: require.resolve("os-browserify"),
  url: require.resolve("url"),
};
config.plugins = (config.plugins || []).concat([
  new webpack.ProvidePlugin({
    process: "process/browser",
    Buffer: ["buffer", "Buffer"],
  }),
]);
config.module.rules.unshift({
  test: /\.m?js$/,
  resolve: {
    fullySpecified: false, // disable the behavior
  },
});

config.resolve.alias["react-dom$"] = "react-dom/profiling";
config.resolve.alias["scheduler/tracing"] = "scheduler/tracing-profiling";
