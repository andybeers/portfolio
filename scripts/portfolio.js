var portfolioItems = [];

function Portfolio (opts) {
  for (var key in opts) {
    this[key] = opts[key];
  }
}

Portfolio.prototype.toHtml = function() {

  var source = $('#portfolio-template').html();
  var template = Handlebars.compile(source);
  
  this.daysAgo = parseInt((new Date() - new Date(this.postedOn))/60/60/24/1000);
  this.postStatus = this.postedOn ? 'posted ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this);
  return html;
};

portfolioData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.postedOn)) - (new Date(curElem.postedOn));
});

portfolioData.forEach(function(ele) {
  portfolioItems.push(new Portfolio(ele));
});

portfolioItems.forEach(function(a) {
  $('#portfolio').append(a.toHtml());
});


// unsure why we included this in our class demonstration
// var firstArticle = ourLocalData[0];
// new Article(firstArticle);
