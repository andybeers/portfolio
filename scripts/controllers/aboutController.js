(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about').fadeIn();
    $('.main-nav .selected').removeClass('selected');
    $('li[data-category="about"]').addClass('selected');
  };

  module.aboutController = aboutController;
})(window);
