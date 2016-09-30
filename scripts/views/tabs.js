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

  tabs.handleCatFilter = function() {
    console.log('tabs.handleCatFilter called');
    $('#cat-filter').on('change', function() {
      var selectVal = $(this).val();
      if (selectVal) {
        console.log(selectVal);
        $('article').hide();
        $('article[data-category="' + selectVal + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
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
    tabs.handleCatFilter();
    tabs.handleMainNav();
    tabs.renderFacts();
  };

  tabs.renderFacts = function() {
    Portfolio.getCats().forEach(function(a) {
      $('#facts-list').append(a.toHtml($('#facts-template')));
    });
  };

  module.tabs = tabs;
  Portfolio.fetchAll(tabs.renderIndex);


})(window);
