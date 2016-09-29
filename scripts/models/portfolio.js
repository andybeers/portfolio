(function(module) {

  function Portfolio (opts) {
    for (var key in opts) {
      this[key] = opts[key];
    }
  }

  Portfolio.all = [];

  Portfolio.prototype.toHtml = function(scriptTemplateId) {
    var source = scriptTemplateId.html();
    var template = Handlebars.compile(source);
    this.daysAgo = parseInt((new Date() - new Date(this.postedOn))/60/60/24/1000);
    this.postStatus = this.postedOn ? 'posted ' + this.daysAgo + ' days ago' : '(draft)';
    return template(this);
  };

  Portfolio.loadAll = function(dataWePassIn) {
    console.log('Portfolio.loadAll called');
    dataWePassIn.sort(function(a,b) {
      return (new Date(b.postedOn)) - (new Date(a.postedOn));
    }).forEach(function(ele) {
      Portfolio.all.push(new Portfolio(ele));
    });
  };

  Portfolio.getAll = function(nextFunction) {
    console.log('Portfolio.getAll called');
    $.getJSON('/data/portfolioItems.json', function(responseData) {
      Portfolio.loadAll(responseData);
      localStorage.portfolioItems = JSON.stringify(responseData);
      nextFunction();
    });
  };

  Portfolio.fetchAll = function(nextFunction) {
    console.log('Portfolio.fetchAll called');
    if (localStorage.portfolioItems) {
      $.ajax({
        type: 'HEAD',
        url: '/data/portfolioItems.json',
        success: function (data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Portfolio.getAll(tabs.renderIndex);
            console.log('Outdated eTag, updating content');
          } else {
            console.log('eTag is current. loading from localStorage');
            Portfolio.loadAll(JSON.parse(localStorage.portfolioItems));
            nextFunction();
          };
        }
      });
    } else {
      console.log('Nothing in local storage');
      Portfolio.getAll(tabs.renderIndex);
    }
  };

  Portfolio.prototype.catsToHtml = function(cats) {
    cats.forEach(function(cat) {
      $('#cats').append('<li>cat</li>');
    });
  };

  //getCats will return array of non-duplicate portfolio item categories
  Portfolio.getCats = function() {
    return Portfolio.all
    .map(function(portfolioItem) {
      return portfolioItem.category;
    })
    .reduce(function(array, curr) {
      if (array.indexOf(curr) === -1) {
        array.push(curr);
      }
      return array;
    }, []);
  };

  module.Portfolio = Portfolio;

})(window);
