var url = require('url');

module.exports = function (config) {
  // Blue sky of options
  // Gittip, Flattr, Paypal, Google Wallet, Amazon Payments
  // Square cash, Bitcoin, Dogecoin, Litecoin, Twitter tip (cannot remember name)
  return function renderIndex (req, res) {
    res.render('support-me', {
      page: 'support-me',
      // TODO: Include the page of origin from URL
      paypalUrl: url.format({
        protocol: 'https:',
        hostname: 'www.paypal.com',
        pathname: '/cgi-bin/webscr',
        query: {
          cmd: '_donations',
          business: config['support-me'].paypal.email,
          lc: 'US',
          item_name: config['support-me'].paypal.email,
          item_number: 'twolfson.com',
          no_note: '0',
          currency_code: 'USD',
          bn: 'PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest'
        }
      }),
      donationConfig: config['support-me'],
      title: 'Todd Wolfson - Support Me',
      seoKeywords: 'Todd Wolfson, twolfson, twolfsn, support me, paypal, gittip',
      // TODO: Update when we have the final list
      seoDescription: 'Support Todd Wolfson via PayPal, Flatter, and Gittip'
    });
  };
};
