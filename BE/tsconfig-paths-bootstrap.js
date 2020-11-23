const tsConfig = require('./tsconfig');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = process.env.PRODUCTION ? './build' : './src';

console.log('base url: ', baseUrl);
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
