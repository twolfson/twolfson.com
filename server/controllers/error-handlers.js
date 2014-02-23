exports.missingPage = function (config) {
  return exports[404];
};

exports.errorEncountered = function (config) {
  return function handleError (err, req, res, next) {
    // Render a 500 page
    config.errorLogger(err, req);
    exports[500](req, res);
  };
};

// 404 page (no SEO here)
exports[404] = function (req, res) {
  res.status(404);
  res.render('404', {'page': '404'});
};

// 500 page
exports[500] = function (req, res) {
  // TODO: Create me
  res.status(500);
  res.render('500', {'page': '500'});
};
