const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
  plugins: {
    'postcss-preset-env': {},
    tailwindcss: {},
    autoprefixer: {},
  },
  sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
};
