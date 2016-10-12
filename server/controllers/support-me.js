// Load in our dependencies
var url = require('url');

// TODO: It's nice that we put support info in `config` but let's seriously hard code it here
//   It's not like we are changing handles frequently
//   and it's easier to maintain in 1 location

// Define our controllers
module.exports = function (config) {
  // Blue sky of options
  // Gratipay, Flattr, Paypal, Google Wallet, Amazon Payments
  // Square cash, Bitcoin, Dogecoin, Litecoin, Twitter tip (cannot remember name)
  return [
    function renderIndex (req, res) {
      var supportConfig = config.supportMe;
      var supportSource = req.query.support || 'generic';
      res.render('support-me.jade', {
        page: 'support-me',
        gratipayUrl: url.format({
          protocol: 'https:',
          hostname: 'gratipay.com',
          pathname: '/' + supportConfig.gratipay + '/'
        }),
        // TODO: Include the page of origin from URL
        paypalUrl: url.format({
          protocol: 'https:',
          hostname: 'www.paypal.com',
          pathname: '/cgi-bin/webscr',
          query: {
            // TODO: Link up all pages to req.query.support (on-site + repos)
            business: supportConfig.paypal.email,
            item_name: supportConfig.paypal.name,
            item_number: supportSource,

            cmd: '_donations',
            lc: 'US',
            no_note: '0',
            currency_code: 'USD',
            bn: 'PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest'
          }
        }),
        flattrUrl: url.format({
          protocol: 'https:',
          hostname: 'flattr.com',
          pathname: '/submit/auto',
          query: {
            user_id: supportConfig.flattr,
            // TODO: Link up all repos with flattr_url and flattr_desc
            url: req.query.flattr_url || 'http://twolfson.com/',
            title: supportSource,
            description: req.query.flattr_desc || 'Support for Todd Wolfson',
            category: 'software'
          }
        }),
        donationConfig: supportConfig,
        title: 'Todd Wolfson - Support Me',
        seoKeywords: 'Todd Wolfson, twolfson, twolfsn, support me, flattr, paypal, bitcoin, dogecoin',
        seoDescription: 'Support Todd Wolfson via Gratipay, Flattr, PayPal, Bitcoin, and Dogecoin'
      });
    }
  ];
};
