const path = require("path");

module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.(js|jsx)$/,
    use: {
      loader: "babel-loader",
      options: {
        exclude: /node_modules/,
        presets: ["@babel/preset-react"],
      },
    },
  },
  {
    test: /\.module\.css$/,  // Manejar archivos con extensión .module.css
    include: [path.resolve(__dirname, "app/src")],
    use: ["style-loader", "css-loader", "postcss-loader"],
  },
  {
    // loads .css files
    test: /\.css$/,
    include: [path.resolve(__dirname, "app/src")],
    use: ["style-loader", "css-loader", "postcss-loader"],
  },
  {
    test: /\.less$/i,
    use: [
      "style-loader",
      "css-loader",
      "less-loader"
    ],
  },
  {
    test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
    use: {
      loader: 'file-loader',
      options: { name: '[name].[ext]' }
    }
  }, //for images
  {
    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
    use: ['file-loader']
  },
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
