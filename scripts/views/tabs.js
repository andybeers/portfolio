(function(module) {

  var tabs = {};

  tabs.handleMainNav = function () {
    console.log('tabs.handleMainNav called');
    $('.main-nav').on('click', '.tab', function() {
      $('.tab-content').hide();
      $('#' + $(this).data('category')).fadeIn();
    });
    $('.main-nav .tab:first').click();
  };

  tabs.renderCatFilter = function() {
    console.log('tabs.renderCatFilter called');
    $('#cat-filter').on('change', function() {
      if ($(this).val()) {
        $('portfolio').hide();
        $('portfolio[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('portfolio').fadeIn();
        $('portfolio.template').hide();
      }
    });
  };

  tabs.renderIndex = function() {
    console.log('tabs.renderIndex called');
    Portfolio.all.forEach(function(a) {
      if($('#cat-filter option:contains("'+ a.category + '")').length === 0) {
        $('#cat-filter').append(a.toHtml($('#cat-filter-template')));
      };
      $('#portfolio-items').append(a.toHtml($('#portfolio-template')));
    });
    tabs.renderCatFilter();
    tabs.handleMainNav();
  };

  module.tabs = tabs;
  Portfolio.fetchAll(tabs.renderIndex);


})(window);
