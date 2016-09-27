var tabs = {};

tabs.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('category')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

tabs.renderPortfolio = function() {
  Portfolio.all.forEach(function(a) {
    $('#portfolio').append(a.toHtml());
  });
};

tabs.handleMainNav();
Portfolio.fetchAll();
