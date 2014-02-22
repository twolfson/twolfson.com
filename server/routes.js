var controllers = require('./controllers');

exports.common = function () {
    // Blog
    // TODO: Integrate Travis CI to local testing (with notifications)
    // TODO: Add test for xml rendering
    var articles = require('../articles');
    router.get('/', routes.blog.index({articles: articles}));
    articles.forEach(function (article) {
      // DEV: Escape '+' as express coerces URL to a regexp
      var url = article.url.replace(/\+/g, '\\+');
      router.get(url, routes.blog.article({article: article}));
    });
    router.get('/index.xml', routes.blog.rss({articles: articles}));

    // Projects pages
    router.get('/projects', routes.projects);

    // Contact pages
    router.get('/contact', routes.contact.index);
    if (config.inDevelopment) {
      router.get('/contact/failure', routes.contact.devFailure);
      router.get('/contact/success', routes.contact.devSuccess);
    }
    router.post('/contact', express.urlencoded(), routes.contact.submit);

    // If we are in development, add a kaleidoscope test page
    if (config.inDevelopment) {
      router.get('/kaleido', routes.kaleido);
    }

    // Support me
    router.get('/support-me', routes['support-me'](config));

    // License and health
    router.get('/license', routes.license);
    router.get('/health', routes.health);

    // If the page is not found, throw an error and render the 404 page
    router.all('*', routes['404']);
};