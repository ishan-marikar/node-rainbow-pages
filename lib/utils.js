var x = require('x-ray')();
var url = require('url');
var validURL = require('valid-url');
var emailRegex = require('email-regex');
var isDomain = require('is-valid-domain');
var debug = require('debug')('rainbow-pages:util');
var utils = module.exports;

utils.crawl = function(uri, callback) {
  debug('Crawling', uri);
  x(uri, '.jd-table.jd-item', [{
      name: '.jd-itemTtile',
      telephoneNumber: 'span.jd-fields-li-value.val-horizontal',
      address: 'div.jd-itemAddress'
    }])
    .paginate('.pagination-next > a@href')
    (function(error, response) {
      if (error) callback(error, null);
      debug('Response recieved.');
      response.map(function(entry) {
        entry.address = entry.address.replace(/(\r\n|\n|\r)/gm, '').replace(/Address/gi, '').trim();
        entry.name = entry.name.trim();
        entry.telephoneNumber = entry.telephoneNumber.trim();
        if (emailRegex().test(entry.telephoneNumber)) {
          debug('telephoneNumber contains an email, moving it around.');
          entry.email = entry.telephoneNumber.match(emailRegex())[0];
          entry.telephoneNumber = null;
        }
        if (isDomain(entry.telephoneNumber)) {
          debug('telephoneNumber contains an website, moving it around.');
          entry.website = entry.telephoneNumber;
          entry.telephoneNumber = null;
        }
      });
      callback(null, response);
    });
};

utils.createUrl = function(options) {
  debug('Creating the base URI.');
  var baseUrl = {
    protocol: 'http',
    hostname: 'rainbowpages.lk',
    pathname: 'search-directory',
    query: {}
  };

  if (typeof options === 'object') {
    debug('Options contains an object/array');
    baseUrl.query = options;
  } else {
    if (typeof options === 'string') {
      debug('Options contains a string.');
      if (validURL.isUri(options)) {
        debug('Options contains a URL.');
        return options;
      } else {
        debug('Options contains a simple search string.');
        baseUrl.query.search = options;
      }
    }
  }

  return url.format(baseUrl);
};
