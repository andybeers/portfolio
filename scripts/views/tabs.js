(function(module) {

  var tabs = {};

  tabs.handleCatFilter = function() {
    $('#cat-filter').on('change', function() {
      var selectVal = $(this).val();
      if (selectVal) {
        $('article').hide();
        $('article[data-category="' + selectVal + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
    });
  };

  tabs.renderIndex = function() {
    Portfolio.all.forEach(function(arg) {
      if($('#cat-filter option:contains("'+ arg.category + '")').length === 0) {
        $('#cat-filter').append(arg.toHtml($('#cat-filter-template')));
      };
      $('#portfolio-items').append(arg.toHtml($('#portfolio-template')));
    });
    tabs.handleCatFilter();
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
