'use strict';

const querystring = require('querystring');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const moment = require('moment');

const REGEX = /([0-9.]+)\s(\w+)/;
const URL = term => `https://thepiratebay.org/search/${term}/0/7/0`;

class PirateBay {
  /**
   * @param {EventEmitter} radio
   */
  constructor(radio) {
    this.radio = radio;
    
    this.radio.on('search', this.search.bind(this));
    this.radio.on('stop', this.stop.bind(this));
  }
  
  /**
   * @param {String} event.id
   * @param {String} event.searchTerm
   * @param {Number} event.num
   */
  search(event) {
    console.log(event.searchTerm);
    
    this.radio.emit(`search-${event.id}`, {data: 'data'});
  }
  
  stop() {
    
  }
  
  /**
   * Loads website on given page, no page will load first page(0).
   * Returns promise that resolves with JSON search results
   * @param [page]
   * @returns Promise
   * @private
   */
  _goto(page) {
    const searchTerm = querystring.escape(this.searchTerm);
    const results = [];
    
    return fetch(URL(searchTerm), {headers: {cookie: 'lw=s'}})
      .then(res => res.text())
      .then(text => {
        const $ = cheerio.load(text);
  
        $('tr', '#searchResult').not('.header').each((i, elem) => {
          const children = $(elem).children();
    
          results.push({
            name: $(children[1]).text(),
            date: PirateBay.toTimestamp($(children[2]).text()),
            magnetLink: $('a', children[3]).attr('href'),
            size: PirateBay.toBytes($(children[4]).text()),
            seed: +$(children[5]).text(),
            leech: +$(children[6]).text()
          });
        });
  
        this.radio.emit('results', results);
      })
      .catch(err => console.log(err));
  }
  
  /**
   * @param {String} byteString
   * @returns {number}
   */
  static toBytes(byteString) {
    const regexResult = REGEX.exec(byteString);
    const amount = +regexResult[1];
    const size = regexResult[2];
    
    switch(size) {
      case 'TiB':
        return amount * 1099511627776;
      case 'GiB':
        return amount * 1073741824;
      case 'MiB':
        return amount * 1048576;
      case 'KiB':
        return amount * 1024;
      default:
        return amount;
    }
  }
  
  /**
   * @param {String} timeString
   * @returns {number}
   */
  static toTimestamp(timeString) {
    if(timeString.includes('Today')) return +moment(timeString.replace('Today', ''), 'HH:mm');
    if(timeString.includes('Y-day')) return +moment(timeString.replace('Y-day', ''), 'HH:mm').subtract(1, 'day');
    
    if(timeString.includes(':')) return +moment(timeString, 'MM-DD HH:mm');
    
    return +moment(timeString, 'MM-DD YYYY');
  }
  
  
}

module.exports = PirateBay;