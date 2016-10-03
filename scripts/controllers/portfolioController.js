(function(module) {
  var portfolioController = {};

  portfolioController.reveal = function() {
    $('.tab-content').hide();
    $('#portfolio').fadeIn();
    $('.main-nav .selected').removeClass('selected');
    $('li[data-category="portfolio"]').addClass('selected');
  };

  module.portfolioController = portfolioController;
})(window);
