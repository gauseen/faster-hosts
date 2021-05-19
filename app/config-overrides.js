const {
   override,
   overrideDevServer,
   addWebpackPlugin
} = require("customize-cra");
const CopyPlugin = require('copy-webpack-plugin');

const multipleEntry = require('react-app-rewire-multiple-entry')([
   {
      entry: 'src/popup/index.js',
      template: 'public/popup.html',
      outPath: '/popup.html'
   },
   {
      entry: 'src/options/index.js',
      template: 'public/index.html',
      outPath: '/index.html'
   }
]);

const devServerConfig = () => config => {
   return {
      ...config,
      writeToDisk: true
   }
}

const copyPlugin = new CopyPlugin({
   patterns: [
      { from: 'public', to: '' },
      { from: 'src/background.js', to: '' }
   ]
})

module.exports = {
   webpack: override(
      addWebpackPlugin(
         copyPlugin
      ),
      multipleEntry.addMultiEntry,
   ),
   devServer: overrideDevServer(
      devServerConfig()
   ),

};