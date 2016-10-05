(function(module) {

  var usersObj = {};

  usersObj.allUsers = [];

  usersObj.requestUsers = function(callback) {
    console.log('requestUser called');
    $.ajax({
      url: 'https://api.github.com/users/andybeers',
      headers: {Authorization: 'token ' + token},
      success: function(data) {
        usersObj.allUsers = data;
        console.log(data + 'inside ajax success callback');
        callback();
      }
    });
  };

  module.usersObj = usersObj;
})(window);
