module.exports = function(app){
  app.controller('GithubController',['$http', function($http){
    var mainRoute = 'https://api.github.com/users/ishidas';
    this.repoData = {};
    this.reposUrl = '';
    this.repoLinks = [];

    //initially getting all repo data into repoData obj.
    //url is separated so it could be used to grab project links
    //by calling this.getRepoLinks function later on.
    $http.get(mainRoute)
    .then((res)=>{
      console.dir(res.data);
      this.repoData = res.data;
      this.reposUrl = res.data.repos_url;
    });

    //attached to a button. getting only name, url and created_at
    this.getRepoLinks = function(){
      $http.get(this.reposUrl)
      .then((res)=>{
        res.data.map((repo)=>{
          var obj = {};
          obj.name = repo.name;
          obj.url = repo.url;
          obj.created_at = repo.created_at;
          this.repoLinks.push(obj);
        });
      });
    };

  }]);//end of controller
};//end of module exports
