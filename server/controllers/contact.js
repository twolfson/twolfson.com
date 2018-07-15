// Default page
exports.index = function (config) {
  return [
    function indexFn(req, res) {
      res.render('contact.jade');
    }
  ];
};
