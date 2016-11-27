'use strict';

const express = require('express');

class Server {
  start() {
    const app = this.app = express();
  
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  
    app.get('/api/search', (req, res) => {
      
      res.send('Hello!');
    });
    
    console.log('Starting server on port 3000');
    app.listen(3000);
  }
  
  close() {
    this.app.close();
  }
}

module.exports = Server;

if(require.main === module) {
  console.log('Starting server');
  const server = new Server();
  server.start();
}