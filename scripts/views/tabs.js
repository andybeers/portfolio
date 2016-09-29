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
    if($('#cat-filter option:contains("'+ a.category + '")').length === 0) {
      $('#cat-filter').append(a.toHtml($('#cat-filter-template')));
    };
    $('#portfolio-items').append(a.toHtml($('#portfolio-template')));
  });
  tabs.handleMainNav();
};

Portfolio.fetchAll();

tabs.renderCatFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};
