// Load in our dependencies
var request = require('request');
var Project = require('./project');

// Define our model
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
    // https://developer.github.com/v3/
    // https://developer.github.com/v3/repos/#get
    request({
      method: 'GET',
      url: 'https://api.github.com/repos/' + encodeURIComponent(owner) + '/' + encodeURIComponent(repoName),
      headers: {
        Accept: 'application/vnd.github.v3+json'
      },
      json: true
    }, function handleRequest (err, res, body) {
      // If there is an error callback with it
      if (err) { return cb(err); }

      // Otherwise, callback with the data
      var retObj = {
        stars: body.watchers_count,
        forks: body.forks_count
      };
      cb(null, retObj);
    });
  }
});
module.exports = ScriptRepo;
