import config from './app.config';

// services

(async () => {
  await config.tools.seedDB();
  console.log('running seedDB');
  config.app.listen();
})();
