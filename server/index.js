'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const {search} = require('./lib/SearchServer');

class Server {
  start() {
    const app = this.app = express();
  
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  
    app.use(bodyParser.json());
    app.get('/api/search', this.searchRequest.bind(this));
    
    console.log('Starting server on port 3000');
    app.listen(3000);
  }
  
  searchRequest(req, res) {
    let searchEmitter = /**@type {Emitter}*/ search(req.query.search, req.query.num);
    let totalResults = 0;
    
    res.header('Content-type', 'text/event-stream');
  
    searchEmitter.on(`results`, results => {
      totalResults += results.length;
      res.write(`data: ${JSON.stringify(results)}\n\n`);
    });
    
    searchEmitter.once('stop', () => {
      console.log(`Got total results: ${totalResults}`);
      searchEmitter = null;
      res.write(`data: done\n\n`);
    });
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