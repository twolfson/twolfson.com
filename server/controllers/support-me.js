// Define our constants
// TODO: Reflect source on donations?
var SUPPORT_URLS = {
  // PayPal - Interational, one time support
  //   https://www.paypal.me/pages/countries
  paypal: 'https://www.paypal.me/twolfson',
  // Bitcoin - Interational, one time support
  //   Managed by Coinbase, interational due to BTC
  bitcoin: '1DrBma5ZGRFRPnzEgsLJXvoogPYcQyruM2'

  // TODO: After exploring which is plausible
  //   Explore which is recurring/1 time and international support
  //   We prob don't want to overwhelm users with options

  // Unused options:
  // Coinbase - Should be good to use
  //   Supports direct wallet address
  //   Supports one time and recurring
  //     https://www.coinbase.com/merchant_tools
  //     https://developers.coinbase.com/docs/wallet/tutorials/donations
  // Stripe - Looks plausible, no server logic too which is great
  //   https://stripe.com/checkout#should-i
  // Patreon - Not designed for open source (e.g. no technology section, no GitHub links)
  //   but they have international support and recurring so it would be dope
  //   https://www.patreon.com/twolfson
  // Open collective - Can make a super collective for me as discussed over email
  //   Not sure of international support

  // Google Wallet - UNEXPLORED
  // Amazon Payments - UNEXPLORED
  // Square cash - UNEXPLORED

  // Gratipay - NO (ditched due to poor UI and never getting approved)
  // Flattr - NO (ditched due to complexity)
  // Bitcoin, Dogecoin, etc standalone - NO (don't want to manage own wallet)
};

// Define our controllers
module.exports = function (config) {
  return [
    function renderIndex (req, res) {
      res.render('support-me.jade', {
        supportUrls: SUPPORT_URLS
      });
    }
  ];
};
