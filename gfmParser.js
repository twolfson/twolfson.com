var gfm = require("marked");
module.exports = function (code) {
  return gfm.parse(code, {langPrefix: ''});
};