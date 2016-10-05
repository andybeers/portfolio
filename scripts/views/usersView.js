(function(module) {
  var usersView = {};

  var source = $('#git-template').text();
  var usersCompiler = Handlebars.compile(source);

  usersView.renderUsers = function() {
    $('#github-facts').empty().append(
      usersCompiler(usersObj.allUsers)
    );
  };

  usersObj.requestUsers(usersView.renderUsers);

  module.usersView = usersView;
})(window);
