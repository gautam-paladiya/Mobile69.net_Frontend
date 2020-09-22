module.exports = {
  presets: ["next/babel"],
  env: { production: { plugins: ["transform-remove-console"] } },
  plugins: [["transform-define", { "process.env.NODE_ENV": "production" }]],
};
