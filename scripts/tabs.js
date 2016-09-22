var tabs = {};

tabs.handleMainNav = function () {
  $('.main-nav .tab').on('click', function() {
    $('.tab-content').hide();
    if ($(this).attr('data-category') === 'portfolio') {
      $('#portfolio').fadeIn();
    } else if ($(this).attr('data-category') === 'about') {
      $('#about').fadeIn();
    }
  });
};

tabs.handleMainNav();
