module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxRuntime: "automatic", // Use modern JSX transform
        },
      ],
    ],
    plugins: [],
  };
};
