var casper = require('casper').create();
var links = [];
var searchEnd = false;
var arrow;
var start = 0;
var url;

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    var response = {};

    response.searchEnd = document.querySelector('#pnnext');

    //searchEnd = document.querySelectorAll('#pnnext') === null;
    //this.echo(document.querySelectorAll('#pnnext'));
    response.data = Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });

    return response;
}

function evalAndAddLinks(ctx) {
  var res = ctx.evaluate(getLinks);

  res.data.forEach(function(v) { console.log( v.slice(7).split('&')[0] )});

  for (var prop in res.searchEnd)
    console.log('res.searchEnd is: ', res.searchEnd[prop]);
}

casper
  .start('http://google.fr/', function() {
      // search for 'casperjs' from google form
      this.fill('form[action="/search"]', { q: 'site:take365.org' }, true);
  });
  /*.each(links, function(self, link) {
    self.thenOpen(newlink, function() {

      let imgLinks = this.evaluate(function() {
        return document.querySelector('img').src;
      });

      this.echo('IMG links is: ');
    });
  });
*/

casper.then(function() {
    // aggregate results for the 'phantomjs' search

    //url = this.getCurrentUrl();

    evalAndAddLinks(this);
});

casper.repeat(9, function() {
  if (searchEnd)
    this.exit();

  start += 10;

  this.thenOpen(url + '&start=' + start, function() {
    evalAndAddLinks(this);
  });
});

//casper.thenOpen()

/*casper.eachThen(links, function(link) {
  console.log('Each link must operate!');

  this.thenOpen(link.data, function(res) {

    console.log('Res is: ', res.url );

  });
});*/

casper.run(function() {
    // echo results in some pretty fashion
    //this.echo(links.length + ' links found:');
    //this.echo(' - ' + links.join('\n - '))
    this.exit();
});
