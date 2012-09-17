var gitter = require('gitter'),
    Repo = gitter.repo;
function fetchRepoStats(repo, cb) {
  // Break out the name from the user
  var repoArr = repo.split('/'),
      user = repoArr[0],
      repoName = repoArr[1];

  // Fetch the repo and callback
  Repo(user, repoName, function (err, data) {
    // If there is an error callback with it
    if (err) { return cb(err); }

    // Otherwise, callback with the data
    var retObj = {'stars': data.watchers, 'forks': data.forks};
    cb(null, retObj);
  });
}