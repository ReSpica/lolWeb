module.exports = {
    devServer: {
      port: 8081,   // 端口号
    },
    publicPath:process.env.Node_ENV ==='production'
    ? '/admin/'
    :'/'  
  };