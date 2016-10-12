// Define our constants
// TODO: Maybe define on `app.locals` -- move back to config in that case

// TODO: Reflect source on donations?
var SUPPORT_URLS = {
  paypal: 'https://www.paypal.me/twolfson'

  // Unused options:
  // Bitcoin - Exploring via Coinbase
  //   https://developers.coinbase.com/docs/wallet/tutorials/donations

  // Google Wallet - UNEXPLORED
  // Amazon Payments - UNEXPLORED
  // Square cash - UNEXPLORED
  // Stripe - UNEXPLORED
  // Patreon - Not designed for open source (e.g. no technology section, no GitHub links)
  //   but they have international support and recurring so it would be dope
  //   We could try forcing it somehow...

  // Gratipay - NO (ditched due to poor UI and never getting approved)
  // Flattr - NO (ditched due to complexity)
  // Dogecoin, Litecoin, etc - NO (don't want to manage own wallet)
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
