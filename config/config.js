var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
	dotenv = require('dotenv'),
	env = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV != 'docker') {
	dotenv.load();
}

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'code',
			iflux_url: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io'
    },
    port: 3006
  },

  test: {
    root: rootPath,
    app: {
      name: 'code',
			iflux_url: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io'
    },
    port: 3006
  },

  production: {
    root: rootPath,
    app: {
      name: 'code',
			iflux_url: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io'
    },
    port: 3006
  }
};

module.exports = config[env];
