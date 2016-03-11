var utils = require('./utils');

var RainbowCrawler = function(options, callback) {
  var url = utils.createUrl(options);
  utils.crawl(url, callback);
};

module.exports = RainbowCrawler;
