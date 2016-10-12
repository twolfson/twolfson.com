// Define our constants
// TODO: Maybe define on `app.locals` -- move back to config in that case

// TODO: Reflect source on donations?
var SUPPORT_URLS = {
  paypal: 'https://www.paypal.me/twolfson'

  // Unused options:
  // Gratipay - NO (ditched due to poor UI and never getting approved)
  // Flattr - NO (ditched due to complexity)
  // Google Wallet - UNEXPLORED
  // Amazon Payments - UNEXPLORED
  // Square cash - UNEXPLORED
  // Bitcoin (ditched due to wallet maintenance)
  //   TODO: Look at Coinbase as Bitcoin solution
  // Dogecoin, Litecoin, etc - NO (don't want to manage own wallet)
  // Stripe - UNEXPLORED
  // Patreon - UNEXPLORED
  // Open collective - Not for single maintainers
};

// Define our controllers
module.exports = function (config) {
  return [
    function renderIndex (req, res) {
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
