module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
            modules: false,
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [
        ["react-intl",
            {
            "idInterpolationPattern": "[sha512:contenthash:base64:6]",
            "extractFromFormatMessageCall": true,
        }],
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-object-rest-spread",
        'styled-components',
    ],
    env: {
      development: {
        plugins: [
            "transform-async-to-generator",
            "transform-class-properties",
            "syntax-export-extensions",
            "transform-export-extensions",
            "react-hot-loader/babel"
        ]
      },
      production: {
        plugins: [
            "transform-async-to-generator",
            "transform-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            "syntax-export-extensions",
            "transform-export-extensions"
        ],
      },
      test: {
        presets: [
            ["@babel/preset-env"],
            "@babel/preset-react",
        ],
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          'dynamic-import-node',
        ],
      },
    },
  };