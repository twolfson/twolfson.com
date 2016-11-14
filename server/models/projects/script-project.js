var Github = require('github');
var Project = require('./project');
// TODO: Somehow this should depend on config
var github = new Github({
  version: '3.0.0'
});

var ScriptRepo = Project.extend({
  update: function (cb) {
    // If it not a gist, update it
    var github = this.get('github') || '';
    var that = this;
    if (github.indexOf('gist') === -1) {
      this._fetchGitHubStats(github, function (err, data) {
        // If there is no error, update the script
        if (!err) {
          if (data.stars !== undefined) { that.set('stars', data.stars); }
          if (data.forks !== undefined) { that.set('forks', data.forks); }
        }

        if (cb) {
          cb(err);
        }
      });
    } else if (cb) {
      process.nextTick(cb);
    }
  },
  _fetchGitHubStats: function (repo, cb) {
    // Break out the name from the owner
    var repoArr = repo.split('/');
    var owner = repoArr[0];
    var repoName = repoArr[1];

    // Fetch the repo and callback
    // http://mikedeboer.github.io/node-github/#api-repos-get
    github.repos.get({
      owner: owner,
      repo: repoName
    }, function handleRepoData (err, data) {
      // If there is an error callback with it
      if (err) { return cb(err); }

      // Otherwise, callback with the data
      var retObj = {
        stars: data.watchers_count,
        forks: data.forks_count
      };
      cb(null, retObj);
    });
  }
});
module.exports = ScriptRepo;
