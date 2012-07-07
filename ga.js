// Attribution to: https://developers.google.com/analytics/resources/articles/gaTrackingTroubleshooting#gifParameters
// and http://www.vdgraaf.info/wp-content/uploads/urchin-image.txt
// and http://www.cheatography.com/jay-taylor/cheat-sheets/google-analytics-utm-parameters-v2/
// and https://groups.google.com/forum/?fromgroups#!topic/analytics-help-basics/BoVQSKV43WM
// and https://groups.google.com/forum/?fromgroups#!topic/analytics-help-basics/ux2jOUrN4To

// End goal syntax:
// var GoogleAnalytics = require('ga'),
//     ga = GoogleAnalytics({'accountId': 'UA-XXXXXX-X'/*, 'domain'... */});
// app.use(ga); // Tracks every page (via req.url -> request.path)
// For events, app.use(ga.event('ev1'));
// For middleware-less usage:
//   var fixedGA = ga.fixed({'page': '/'}) -- use .bind() for this
//   fixedGA() is a page view
//   fixedGA.event('ev2') is an event

// TODO: Enforce DNT

var http = require('http');

module.exports = function GA(options) {
  // Override options for now
  options = {
    'accountId': 'UA-17165993-1',
    'domain': 'twolfson.com'
  };

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function generateCookie() {
    var now = +new Date(),
        __utma = [
          148522802, // TODO: Domain hash
          rand(1000000000, 2147483647), // Unique visitor id
          now, // Timestamp of first visit
          now, // Timestamp of previous (most recent) visit
          now, // Timestamp of current visit
          1 // Visit count
        ].join('.'),
        __utmz = [
          148522802, // TODO: Domain hash
          now, // Timestamp when cookie was set
          1, // Visits made when cookie was set
          1, // How many sources has this visitor come from
          [
            'utmccn=(none)', // Camaign
            'utmcsr=(direct)', // Source
            'utmcmd=referral' // Medium
            // 'utmctr=' (keyword)
          ].join('|')
        ].join('.'),
        cookieStr = '__utma=' + __utma + ';__utmz=' + __utmz;
    return cookieStr;
  }

  // TODO: Raw function and sugar wrapper for middleware

  // Create a function to preserving the options to
  function ga(req, res, next) {
    var cookie = req.headers.cookie || '';

    // If the cookie does not have GA data, fall it back to new data
    if (cookie.indexOf('__utma') === -1) {
      cookie = generateCookie();
    }

    var outOptions = {
      'utmac': options.accountId, // Account id (UA-XXXXXX-X)
      'utmhn': options.domain, // Domain
      'utmp': req.url, // Path
      'utmwv': '5.3.3', // Tracking code version
      'utms': '1', // Useless internal counter

      // TODO's
      'utmn': rand(1000000000, 9999999999), // Unique id for GIF request
      // 'utmcs': 'UTF-8', // TODO: Language encoding || '-'
      // TODO: Allow utmt (event type) as a parameter
      // 'utmul': 'en-us', // TODO: Browser language?
      'utmdt': 'twolfson.com%20-%20A%20place%20for%20Javascript%20and%20ideas', // TODO: Page title
      'utmhid': rand(10000000, 99999999), // TODO: Allow input of AdSense request id
      'utmr': '-', // TODO: Full referral URL
      'utmcc': cookie
    },
    outKeys = Object.getOwnPropertyNames(outOptions),
    outPairs = outKeys.map(function (outKey) {
      return outKey + '=' + outOptions[outKey];
    }),
    queryStr = outPairs.join('&');
    var gaReq = http.request({
      // 'host': 'localhost',
      // 'port': 8080,
      'host': 'www.google-analytics.com',
      'path': '/__utm.gif?' + queryStr
    }, function (gaRes) {
      gaRes.on('error', function (err) {
        console.error('An error has occurred with GA: ' + err);
      });
    });

    gaReq.end();

    next();
  };

  // TODO: Copy over said options to the function

  // Return the function
  return ga;

  // TODO: Create a .event() method for good measure
};