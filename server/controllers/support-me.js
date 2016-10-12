// Define our constants
// TODO: Maybe define on `app.locals` -- move back to config in that case
var SUPPORT_URLS = {
  paypal: 'https://www.paypal.me/twolfson'
};

// Define our controllers
module.exports = function (config) {
  // Blue sky of options
  // Gratipay, Flattr, Paypal, Google Wallet, Amazon Payments
  // Square cash, Bitcoin, Dogecoin, Litecoin, Twitter tip (cannot remember name)
  return [
    function renderIndex (req, res) {
      var supportSource = req.query.support || 'generic';
      res.render('support-me.jade', {
        supportUrls: SUPPORT_URLS,
        page: 'support-me',
        title: 'Todd Wolfson - Support me',
        seoKeywords: 'Todd Wolfson, twolfson, twolfsn, support me, flattr, paypal, bitcoin, dogecoin',
        seoDescription: 'Support Todd Wolfson via Gratipay, Flattr, PayPal, Bitcoin, and Dogecoin',

        // TODO: Remove `navMargin` altogether by making design consistent
        navMargin: false
      });
    }
  ];
};
