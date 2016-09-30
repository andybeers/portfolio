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
    tabs.renderFacts($('#facts-template'));
  };

  tabs.renderFacts = function(templateId) {
    Portfolio.getCats().forEach(function(item) {
      var source = templateId.html();
      var template = Handlebars.compile(source);
      if($('#facts-list li:contains("'+item.category+'")').length === 0) {
        $('#facts-list').append(template(item));
      }
    });
  };

  module.tabs = tabs;
  Portfolio.fetchAll(tabs.renderIndex);


})(window);
