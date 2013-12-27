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
          // TODO: Link up all pages to req.query.support (on-site + repos)
          business: config['support-me'].paypal.email,
          item_name: config['support-me'].paypal.email,
          item_number: req.query.support || 'generic',

          cmd: '_donations',
          lc: 'US',
          no_note: '0',
          currency_code: 'USD',
          bn: 'PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest'
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
