exports.missingPage = function (config) {
  return exports[404];
};

exports.errorEncountered = function (config) {
  return function handleError (err, req, res, next) {
    // If we should throw errors, throw the error
    if (config.throwCaughtErrors) {
      throw err;
    }

    // Log the error and render a 500
    config.errorHandler(err, req);
    exports[500](req, res);
  };
};

// 404 page (no SEO here)
exports[404] = function (req, res) {
  res.status(404);
  res.render('404.jade');
};

// 500 page
exports[500] = function (req, res) {
  res.status(500);
  res.render('500.jade');
};
