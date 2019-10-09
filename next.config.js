// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      'mongodb+srv://omnistack:omnistack@cluster0-vnaya.mongodb.net/mern?retryWrites=true&w=majority',
    JWT_SECRET: '1240128H11Ç2O5U12U128419284',
    CLOUDINARY_URL:
      'https://api.cloudinary.com/v1_1/marcelonilima/image/upload',
    STRIPE_SECRET_KEY: 'sk_test_w7Jqjb6VJHNJuxMeHLUWkcuM00YTiRGcnR',
  },
  // webpack: (config, { dev }) => {
  //   // disable sourcemaps of webpack
  //   config.devtool = false;

  //   // disable soucemaps of babel-loader
  //   for (const r of config.module.rules) {
  //     if (r.loader === 'babel-loader') {
  //       r.options.sourceMaps = false;
  //     }
  //   }

  //   return config;
  // },
};
