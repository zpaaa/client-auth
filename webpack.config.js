const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = {
  entry:{},
  // entry: {
  //   ie: './src/ie/upload.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: '[name]-[contenthash].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
          test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                  limit: 10240,
                  name: 'img/[name].[hash:7].[ext]'
              }
            }
          ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './public/ie/skin-upload.html'),
    //   filename: 'index.html'
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin()
  ]

}


const entrys = [
  {
    name: 'extension',
    entry: './src/ie/extension.js'
  },
  {
    name: 'skin',
    entry: './src/ie/skin.js'
  }
]

entrys.forEach((entry)=> {
  console.log(entry)
  config.entry[entry.name] = entry.entry;
  const entryHtml = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `./public/ie/${entry.name}/index.html`),
    filename: path.resolve(__dirname, './dest' ,`${entry.name}/index.html`)
  })
  config.plugins.push(entryHtml)
})


module.exports = config