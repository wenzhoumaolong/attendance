module.exports = app => {
  return class RenderController extends app.Controller {
    * index() {
      // const assets = require('../../dist/assets.json');

      // const getFinalAssets = (obj) => {
      //   obj = obj || {};
      //   const scripts = [];
      //   const styles = [];

      //   Object.keys(obj).sort((a, b) => {
      //     return b === 'manifest' ? 1: 0; // 保证manifest永远在最前面, manifest文件是webpack公共部分
      //   }).forEach(key => {
      //     const asset = obj[key];
      //     if (asset) {
      //       asset.js && scripts.push(asset.js);
      //       asset.css && styles.push(asset.css);
      //     }
      //   });

      //   return { scripts, styles };
      // };
      yield this.ctx.render('layout.pug', {
        scripts: ['/vendor.js', '/app.js']
      });
    }
  }
}
