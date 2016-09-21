var portfolioItems = [];

function Portfolio (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.previewUrl = opts.previewUrl;
  this.previewAlt = opts.previewAlt;
  this.linkUrl = opts.linkUrl;
  this.description = opts.description;
  this.postedOn = opts.postedOn;
}

Portfolio.prototype.toHtml = function() {
  var $newPortfolio = $('.template').clone();

  $newPortfolio.attr('data-category', this.category);
  $newPortfolio.find('.title').text(this.title);
  $newPortfolio.find('.preview img').attr('src', this.previewUrl);
  $newPortfolio.find('.preview img').attr('alt', this.previewAlt);
  $newPortfolio.find('.description').html(this.description);
  $newPortfolio.find('.preview a').attr('href', this.linkUrl);
  $newPortfolio.find('time[pubdate]').attr('title', this.postedOn);
  $newPortfolio.find('time').html('about ' + parseInt((new Date() - new Date(this.postedOn))/60/60/24/1000) + ' days ago');

  $newPortfolio.removeClass('template');

  return $newPortfolio;

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
