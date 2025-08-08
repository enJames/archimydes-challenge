import environmentLoader from './src/environmentVariablesLoader';
environmentLoader();

import tools from './src/tools';
tools.database.connection.sync({ logging: console.log, force: false });