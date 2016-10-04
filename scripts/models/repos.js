(function(module) {

  var reposObj = {};

  reposObj.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/andybeers/repos',
      headers: {Authorization: 'token ' + githubtoken},
      success: function(data) {
        reposObj.allRepos = data;
        callback();
      }
    });
  };

  reposObj.withTheAttribute = function(myAttr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.reposObj = reposObj;

})(window);
