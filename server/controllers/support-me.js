// Define our constants
// TODO: Output source on donations (e.g. `utm_source=repo`)
var SUPPORT_URLS = {
  // PayPal - Partially interational (lacks Japan), one time support
  //   https://www.paypal.me/pages/countries
  //     Australia, Austria, Belgium, Canada, China, Denmark, France,
  //     Germany, Hong Kong SAR China, India, Indonesia, Italy, Netherlands,
  //     Norway, Philippines, Poland, Russia, Singapore, Spain, Sweden,
  //     Switzerland, Thailand, United Kingdom, United States, Vietnam
  paypal: 'https://www.paypal.me/twolfson',
  // Bitcoin - Interational, one time support
  //   Managed by Coinbase, interational due to BTC
  bitcoin: '1DrBma5ZGRFRPnzEgsLJXvoogPYcQyruM2',
  // Patreon - Not designed for open source (e.g. no technology section, no GitHub links)
  //   but they have international support and recurring so it would be dope
  //   https://www.patreon.com/twolfson
  //   International support via: Visa, MasterCard, America Express, JCB, Discover, Diners Club and PayPal
  //     https://patreon.zendesk.com/hc/en-us/articles/204606275-Do-you-support-international-payments-Can-I-donate-in-any-currency-
  patreon: 'https://www.patreon.com/twolfson'

  // Plausible yet unused options:
  // Coinbase - Should be good to use (USD, BTC, ETH)
  //   Supports one time and recurring
  //     https://www.coinbase.com/merchant_tools
  //     https://developers.coinbase.com/docs/wallet/tutorials/donations
  // Open collective - Can make a super collective for me as discussed over email
  //   Backed by Stripe for donations, kind of pointless for our current wants
  // Stripe - Looks plausible: requires server logic, needs logic for dynamic values (especially subscriptions)
  //   https://stripe.com/checkout#should-i
  //   Supports recurring and BTC (but only with USA users? -- am I the user or is the customer the user?)
  //   Supports most countries via conversion
  //     https://support.stripe.com/questions/which-currencies-does-stripe-support

  // Unlikely options:
  // Amazon Payments - Seems usable but not too practical (e.g. no variable donation)
  //   https://payments.amazon.com/developer/documentation/express/201747030

  // Bad options:
  // Google Wallet - NO (limited to USA)
  //   https://www.google.com/wallet/
  // Gratipay - NO (ditched due to poor UI and never getting approved)
  // Flattr - NO (ditched due to complexity)
  // Venmo - NO (limited to USA)
  //   https://venmo.com/about/product/
  //   https://help.venmo.com/hc/en-us/articles/226001687-General-Business-Partnership-Inquiries
  // Square Cash - NO (limited international support)
  //   https://squareup.com/help/us/en/article/4956-international-availability
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
