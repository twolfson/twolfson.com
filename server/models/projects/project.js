var Backbone = require('backbone');

var Project = Backbone.Model.extend({
  initialize: function () {
    this.set('srcUrl', this._getSrcUrl());
    this.set('pageUrl', this._getPageUrl());
  },
  _getSrcUrl: function () {
    // Get the github info and url fallback
    var github = this.get('github');
    var srcUrl = this.get('srcUrl');

    // If there is a srcUrl, return now
    if (srcUrl !== undefined) {
      return srcUrl;
    }

    // If there is a github repo, use that
    if (github !== undefined) {
      // If the this is a gist, return it as such
      var isGist = github.indexOf('gist') > -1;
      if (isGist) {
        srcUrl = 'https://gist.github.com/' + github.slice(5);
      // Otherwise, go with the normal github flow
      } else {
        srcUrl = 'https://github.com/' + github;
      }
    }

    return srcUrl;
  },
  _getPageUrl: function () {
    var srcUrl = this._getSrcUrl();
    var mdn = this.get('mdn');
    var pageUrl = this.get('pageUrl');

    // If the pageUrl is not defined
    if (pageUrl === undefined) {
      // and mdn is defined, use that
      if (mdn !== undefined) {
        pageUrl = 'https://developer.mozilla.org/en-US/demos/detail/' + mdn;
      } else {
      // Otherwise, fallback to the srcUrl
        pageUrl = srcUrl;
      }
    }

    return pageUrl;
  }
});
module.exports = Project;
