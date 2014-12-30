var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
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
    links = links.concat(this.evaluate(getLinks)).map(function(v) {return v.slice(7).split('&')[0];}).slice(0, 2);

    this.echo('Links completed! : ', links);
});

casper.each(links, function(casper, link) {
  //this.echo('Each link must operate!');

  this.open(link, function() {

    this.echo('Title is: ', this.getTitle() );

  });
});

casper.run(function() {
    // echo results in some pretty fashion
    //this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
