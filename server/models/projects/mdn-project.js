var Backbone = require('backbone');
var https = require('https');

var MdnRepo = Backbone.Model.extend({
});
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
module.exports = fetchMDNStats;
