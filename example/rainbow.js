var crawler = require('../lib/crawler');

crawler('http://rainbowpages.lk/embassies/diplomatic-missions-foreign-representatives-in-sri-lanka', function(error, data) {
  if(error) throw error;
  console.log(data);
});
