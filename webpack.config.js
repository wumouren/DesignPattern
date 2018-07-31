const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','@babel/preset-es2015']
          }
        }
      }
    ]
  },
  devServer:{ 
    contentBase: path.resolve(__dirname, "dist"), // 未经 webpack 处理的静态文件访问路径
    port: 9999,
    publicPath: '/', // 确定应该从哪里提供 bundle，并且此选项优先。建议将 devServer.publicPath 和 output.publicPath 的值保持一致。
    overlay:{ //当有编译错误或者警告的时候显示一个全屏 overlay
      errors:true,
      warnings:true,
    },
  },
  plugins: [
    // 每次打包前清除 dist 下的文件
    new CleanWebpackPlugin('dist'),

    // 生成新的 html 文件
    new HtmlWebpackPlugin({ 
      filename: 'index.html', // 如果文件名不是 index , 开发时要在 url 处添加文件名
      template: path.resolve(__dirname + '/src/index.html'), // 注意路径,
    }) 
  ]
}