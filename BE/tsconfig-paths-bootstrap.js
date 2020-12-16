const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig');

const baseUrl = process.env.PRODUCTION ? './build' : './src';

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
