var Github = require('github');
var github = new Github({
  version: '3.0.0'
});

function fetchRepoStats(repo, cb) {
  // Break out the name from the user
  var repoArr = repo.split('/');
  var user = repoArr[0];
  var repoName = repoArr[1];

  // Fetch the repo and callback
  github.repos.get({
    user: user,
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
module.exports = fetchRepoStats;
