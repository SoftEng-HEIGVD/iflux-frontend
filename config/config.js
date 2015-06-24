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
      name: 'iFLUX Frontend',
			apiUrl: process.env.IFLUX_PUBLIC_API_URL
    },
    port: 3007
  },

  test: {
    root: rootPath,
    app: {
	    name: 'iFLUX Frontend',
	    apiUrl: process.env.IFLUX_PUBLIC_API_URL
    },
    port: 3007
  },

  production: {
    root: rootPath,
    app: {
	    name: 'iFLUX Frontend',
	    apiUrl: process.env.IFLUX_PUBLIC_API_URL
    },
    port: 3007
  },

	docker: {
   root: rootPath,
   app: {
    name: 'iFLUX Frontend',
	   apiUrl: process.env.IFLUX_PUBLIC_API_URL
   },
   port: 3000
 }
};

module.exports = config[env];
