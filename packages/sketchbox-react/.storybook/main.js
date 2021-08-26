module.exports = {
  typescript: {
    check: false
  },
  core: {
    builder: "webpack5",
  },
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true
        },
      }
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
