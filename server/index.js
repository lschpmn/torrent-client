'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const SearchServer = require('./lib/SearchServer');

class Server {
  start() {
    const app = this.app = express();
    this.searchServer = new SearchServer();
  
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  
    app.use(bodyParser.json());
    app.post('/api/search', this.searchRequest.bind(this));
    
    console.log('Starting server on port 3000');
    app.listen(3000);
  }
  
  searchRequest(req, res) {
    const searchServer = this.searchServer;
    const id = Math.random().toString(35).slice(0, 10);
    
    searchServer.radio.on(`results-${id}`, results => {
      res.send(results);
      searchServer.stop();
    });
    
    searchServer.search(id, req.body.search, req.body.num);
    
    console.log(req.body);
    res.send('Got it!');
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