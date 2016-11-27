'use strict';

const express = require('express');

class Server {
  start() {
    const app = this.app = express();
    
    app.get('/search', (req, res) => {
      
      res.send('ok');
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