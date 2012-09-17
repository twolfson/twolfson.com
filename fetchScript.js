var gitter = require('gitter'),
    Repo = gitter.repo;

// Repo('twolfson', 'File-Watcher', function (err, repo) {
// // Repo('mythz', 'jquip', function (err, repo) {
//   console.log('watchers', repo.watchers);
//   console.log('forks', repo.forks);
// });

// https://developer.mozilla.org/en-US/demos/detail/indexeddb-editor
var http = require('https');
http.get({'host': 'developer.mozilla.org', 'path': '/en-US/demos/detail/indexeddb-editor'}, function (res) {
  var html = "";
  res.on('data', function (chunk) {
    html += chunk;
  });
  res.on('end', function () {
    var viewArr = html.match(/(\d+) views/),
        likeArr = html.match(/(\d+) likes/);

    if (viewArr && viewArr.length >= 2) {
      var views = viewArr[1];
      if (views !== undefined) {
        console.log('views', views);
      }
    }

    if (likeArr && likeArr.length >= 2) {
      var likes = likeArr[1];
      if (likes !== undefined) {
        console.log('likes', likes);
      }
    }
  });
});