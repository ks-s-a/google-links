var casper = require('casper').create();
var links = [];
var searchEnd = false;
var arrow;
var start = 0;
var url;

//casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36');

casper
  .start('http://google.ru/', function() {
      // search for 'casperjs' from google form
      this.fill('form[action="/search"]', { q: 'site:udaff.com' }, true);
      //this.sendKeys('.gbqfb', casper.page.event.key.Enter , {keepFocus: true});  
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

    url = this.getCurrentUrl();

this.capture('pic.png');

    checkNextPageAndClick.call(this);
});

/*casper.repeat(1, function() {

  //if (!this.getHTML('td.b', true))
  //  return;

  console.log( this.getCurrentUrl() );
  console.log(this.getTitle());
  console.log( this.('h3.r a') );

  start += 10;

  this.thenOpen(url + '&start=' + start, function() {
    evalAndAddLinks(this);
  });
});*/

casper.run(function() {
    // echo results in some pretty fashion
    //this.echo(links.length + ' links found:');
    //this.echo(' - ' + links.join('\n - '))
    this.exit();
});

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    var response = {};

    //response.searchEnd = '' + document.querySelector('.pn');

    response.html = document.querySelector('body').innerHTML;
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
}

function checkNextPageAndClick() {
  evalAndAddLinks(this);

  if (this.getHTML('#nav td.b:last-child > a'))
    this.thenClick('#nav td.b:last-child > a', checkNextPageAndClick);

  console.log( this.getCurrentUrl() );

  return false;
}