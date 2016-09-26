var tabs = {};

tabs.handleMainNav = function () {
  $('.main-nav .tab').on('click', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('category')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

tabs.handleMainNav();
