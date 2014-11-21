var Project = require('./project');
var https = require('https');

var CompetitionRepo = Project.extend({
  update: function (cb) {
    // If it an mdn file, update it
    var mdn = this.get('mdn');
    var that = this;
    if (mdn) {
      this._fetchMDNStats(mdn, function (err, data) {
        // If there is no error, update the competition
        if (!err) {
          if (data.views !== undefined) { that.set('views', data.views); }
          if (data.likes !== undefined) { that.set('likes', data.likes); }
        }

        if (cb) {
          cb(err);
        }
      });
    } else if (cb) {
      process.nextTick(cb);
    }
  },
  _fetchMDNStats: function (name, cb) {
    // Make a request to MDN
    // TODO: Make this its own repo
    var path = '/en-US/demos/detail/' + name;
    https.get({host: 'developer.mozilla.org', path: path}, function (res) {
      // Collect data
      var html = '';
      res.on('data', function (chunk) {
        html += chunk;
      });

      // Once all the data is collected
      res.on('end', function () {
        // Find the view and like count
        var viewArr = html.match(/(\d+) views/);
        var likeArr = html.match(/(\d+) likes/);
        var retObj = {};

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
});
module.exports = CompetitionRepo;
