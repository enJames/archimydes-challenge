import environmentVariablesLoader from '../src/environmentVariablesLoader';

process.env.NODE_ENV = 'test';
environmentVariablesLoader();
