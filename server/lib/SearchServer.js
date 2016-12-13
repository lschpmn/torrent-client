'use strict';

const Emitter = require('events');
const PirateBay = require('./sites/PirateBay');

/**
 * @param {String} searchTerm
 * @param {Number} [num]
 * @returns {EventEmitter}
 */
function search(searchTerm, num = 30) {
  let radio = new Emitter();
  let sites = [new PirateBay(radio)];
  let sitesDone = 0;
  console.log(`Created search for ${searchTerm}`);
  
  radio.on('done', () => {
    sitesDone++;
    
    if(sitesDone === sites.length) {
      console.log('All sites done');
      radio.emit('stop');
    }
  });
  
  radio.emit('search', searchTerm, num);
  
  return radio;
}

module.exports = { search };

/**
 * @typedef {Object} torrentResult
 * @property {String} name
 * @property {Number} date - Epoch timestamp in milliseconds
 * @property {String} magnetLink
 * @property {Number} size - Size of torrents in bytes
 * @property {Number} seed
 * @property {Number} leech
 */