var gitter = require('gitter'),
    Repo = gitter.repo;
    // repo = new Repo('twolfson', 'File-Watcher');

Repo('mythz', 'jquip', function (err, repo) {
  console.log('watchers', repo.watchers);
  console.log('forks', repo.forks);
});