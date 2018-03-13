import env from 'node-env-file';

export default serverType => {
  switch (process.env.NODE_ENV) {
  case 'production':
    env(`${__dirname}/config.${serverType}.prod.env`);
    break;
  case 'development':
    env(`${__dirname}/config.${serverType}.dev.env`);
    break;
  default:
    process.env.NODE_ENV = 'local';
    env(`${__dirname}/config.${serverType}.local.env`);
  }
};
