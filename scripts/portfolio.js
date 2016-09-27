function Portfolio (opts) {
  for (var key in opts) {
    this[key] = opts[key];
  }
}

Portfolio.all = [];

Portfolio.prototype.toHtml = function() {
  var source = $('#portfolio-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.postedOn))/60/60/24/1000);
  this.postStatus = this.postedOn ? 'posted ' + this.daysAgo + ' days ago' : '(draft)';
  var html = template(this);
  return html;
};

Portfolio.loadAll = function(dataWePassIn) {
  dataWePassIn.sort(function(a,b) {
    return (new Date(b.postedOn)) - (new Date(a.postedOn));
  }).forEach(function(ele) {
    Portfolio.all.push(new Portfolio(ele));
  });
};

Portfolio.fetchAll = function() {
  if (localStorage.portfolioItems) {
    $.ajax({
      type: 'HEAD',
      url: '/data/portfolioItems.json',
      complete: function (result) {
        var eTag = result.getResponseHeader('ETag');
        console.log('new ETag = ' + eTag + 'vs old ETag = ' + localStorage.getItem('eTag'));
        if (eTag === localStorage.getItem('eTag')) {
          var storedData = JSON.parse(localStorage.getItem('portfolioItems'));
          Portfolio.loadAll(storedData);
          tabs.renderPortfolio();
        } else {
          $.ajax({
            type: 'GET',
            url: '/data/portfolioItems.json',
            success: successHandler
          });
          function successHandler(data) {
            localStorage.setItem('portfolioItems', JSON.stringify(data));
            Portfolio.loadAll(data);
            tabs.renderPortfolio();
          };
          $.ajax({
            type: 'HEAD',
            url: '/data/portfolioItems.json',
            complete: function (result) {
              var eTag = result.getResponseHeader('ETag');
              localStorage.setItem('eTag', eTag);
            }
          });
        }
      }
    });
  } else {
    $.ajax({
      type: 'GET',
      url: '/data/portfolioItems.json',
      success: successHandler
    });
    function successHandler(data) {
      localStorage.setItem('portfolioItems', JSON.stringify(data));
      Portfolio.loadAll(data);
      tabs.renderPortfolio();
    };
    $.ajax({
      type: 'HEAD',
      url: '/data/portfolioItems.json',
      complete: function (result) {
        var eTag = result.getResponseHeader('ETag');
        localStorage.setItem('eTag', eTag);
      }
    });
  }
};
