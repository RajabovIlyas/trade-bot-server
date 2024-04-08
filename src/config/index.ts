import { configDevelopment } from './config.development';
import { configProduction } from './config.production';

const envelopment = {
  development: configDevelopment,
  production: configProduction,
};

export default {
  ...(envelopment[process.env.NODE_ENV] || envelopment.development),
};
