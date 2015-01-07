var casper = require('casper').create();

//casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36');

casper.start('http://google.ru/', function() {
  // search for target from google form
  this.fill('form[action="/search"]', { q: 'site:take365.org' }, true);
});

casper.then(checkNextPageAndClick);

casper.run();

function getLinks() {
    var searchLinks = document.querySelectorAll('h3.r a');
    var response = {};

    //response.isLastSearchPage = !document.querySelectorAll('#nav td.b:last-child > a');
    response.data = Array.prototype.map.call(searchLinks, function(e) {
        return e.getAttribute('href');
    });

    return response;
}

function evalAndAddLinks(ctx) {
  var res = ctx.evaluate(getLinks);

  res.data.forEach(function(v) { console.log( v.slice(7).split('&')[0] ) });

  //return res.isLastSearchPage;
}

function checkNextPageAndClick() {
  var islastPage = evalAndAddLinks(this);

  //if (!islastPage)
    this.thenClick('#nav td.b:last-child > a', checkNextPageAndClick);
}