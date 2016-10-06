(function(module) {

  var usersObj = {};

  usersObj.allUsers = [];

  usersObj.requestUsers = function(callback) {
    console.log('requestUser called');
    $.ajax({
      url: 'https://api.github.com/users/andybeers',
      success: function(data) {
        usersObj.allUsers = data;
        callback();
      }
    });
  };

  module.usersObj = usersObj;
})(window);
