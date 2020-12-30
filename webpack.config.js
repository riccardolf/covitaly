const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss'),
              require('autoprefixer'),
              purgecss({
                content: ['./src/**/*.html', './src/**/*.ts'],
                // Example to let PurgeCss know how to exclude cdk and mat prefixes if your using Angular CDK and Angular Material
                whitelistPatterns: [/^cdk-|mat-/]
              })
            ],
          },
        },
      },
    ],
  },
};
