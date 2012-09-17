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

var https = require('https');
function fetchMDNStats(name, cb) {
  // Make a request to MDN
  var path = '/en-US/demos/detail/' + name;
  https.get({'host': 'developer.mozilla.org', 'path': path}, function (res) {
    // Collect data
    var html = "";
    res.on('data', function (chunk) {
      html += chunk;
    });

    // Once all the data is collected
    res.on('end', function () {
      // Find the view and like count
      var viewArr = html.match(/(\d+) views/),
          likeArr = html.match(/(\d+) likes/),
          retObj = {};

      // Carefully pick them out
      try {
        if (viewArr && viewArr.length >= 2) {
          var views = viewArr[1];
          if (views !== undefined) {
            retObj.views = views;
          }
        }

        if (likeArr && likeArr.length >= 2) {
          var likes = likeArr[1];
          if (likes !== undefined) {
            retObj.likes = likes;
          }
        }
      } catch (e) {
      }

      // Callback with the data
      cb(null, retObj);
    });
  });
}

// TESTS
fetchRepoStats('twolfson/File-Watcher', function () { console.log('fw', arguments); });
fetchMDNStats('indexeddb-editor', function () { console.log('id', arguments); });