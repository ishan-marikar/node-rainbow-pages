# Rainbow Search
A small and simple crawler for SLT's [Rainbow Pages](http://rainbowpages.lk/).

![alt text][logo]

** This was done for educational purposes. SLT, please don't sue me. :c **

## Installation

```bash
  npm install rainbow-pages --save
```

## Usage

```js

  var rainbow = require('rainbow-pages');

  // Searching using a string
  rainbow('marikar', function(error, records) {
    if(error) throw error;
    fs.writeFile('input.txt', JSON.stringify(records),  function(error) {
      if(error) throw error;
    });
  });

  // Searching using an object
  rainbow({
    search: 'marikar',
    address: 'colombo'
  }, function(error, records) {
    if(error) throw error;
    fs.writeFile('input.txt', JSON.stringify(records),  function(error) {
      if(error) throw error;
    });
  });

  // Search using a link to the page
  rainbow('http://rainbowpages.lk/embassies/diplomatic-missions-foreign-representatives-in-sri-lanka', function(error, records) {
    if(error) throw error;
    fs.writeFile('input.txt', JSON.stringify(records),  function(error) {
      if(error) throw error;
    });
  });
```

## Notes
The reason as to why searches usually take a while to search is because what this module does is that it crawls the Rainbow Pages and scrapes data off of it. As you can imagine, this isn't really all that efficient, and with SLT's lack of a public API, there's no other way ( The Rainbow Pages android app uses an API, but the data is encoded/encrypted and I didn't spend a lot of time looking into it).

If you want to see more detailed diagnostics data, try adding using the environmental variable "DEBUG=rainbow-pages:*" or "DEBUG=*".

```
DEBUG=* node example/rainbow.js
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## Release History
- 0.1.0 Initial release

[logo]: https://s-media-cache-ak0.pinimg.com/236x/96/a5/2e/96a52ebbebeee9ecbe9aee4561283b54.jpg "I taste the  rainbow"
