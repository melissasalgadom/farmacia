const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'farmacia'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://electiva:electiva@cluster0-shard-00-00-xjidb.mongodb.net:27017,cluster0-shard-00-01-xjidb.mongodb.net:27017,cluster0-shard-00-02-xjidb.mongodb.net:27017/farmacia?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
  },

  test: {
    root: rootPath,
    app: {
      name: 'farmacia'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://electiva:electiva@cluster0-shard-00-00-xjidb.mongodb.net:27017,cluster0-shard-00-01-xjidb.mongodb.net:27017,cluster0-shard-00-02-xjidb.mongodb.net:27017/farmacia?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'farmacia'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://electiva:electiva@cluster0-shard-00-00-xjidb.mongodb.net:27017,cluster0-shard-00-01-xjidb.mongodb.net:27017,cluster0-shard-00-02-xjidb.mongodb.net:27017/farmacia?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
    
  }
};

module.exports = config[env];
