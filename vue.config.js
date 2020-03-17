module.exports ={
    publicPath:'./',
    assetsDir:'static',//静态资源文件位置,相对于dist
    chainWebpack: config => {
        config.module
          .rule("eslint")
          .use("eslint-loader")
          .loader("eslint-loader")
          .tap(options => {
            options.fix = true;
            return options;
          });
      }
};