var page = require('webpage').create();
page.onLoadFinished = function (status) {
  console.log('status2', status);
};
page.open('http://google.com/', function (status) {
    console.log('status', status);
    // setTimeout(function () {
      console.log('render output', page.render('a.png'));
      phantom.exit();
    // }, 100);
});