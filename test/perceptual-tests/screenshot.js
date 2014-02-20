var page = require('webpage').create();
page.open('http://google.com/', function (status) {
    console.log('status', status);
    console.log('render output', page.render('github.png'));
    phantom.exit();
});