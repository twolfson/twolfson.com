module.exports = function (config) {
  // Blue sky of options
  // Gittip, Flattr, Paypal, Google Wallet, Amazon Payments
  // Square cash, Bitcoin, Dogecoin, Litecoin, Twitter tip (cannot remember name)
  return function renderIndex (req, res) {
    res.render('support-me', {
      page: 'support-me',
      // TODO: Include the page of origin from URL
      // TODO: Include bitcoin address, dogecoin address
      title: 'Todd Wolfson - Support Me',
      seoKeywords: 'Todd Wolfson, twolfson, twolfsn, support me, paypal, gittip',
      // TODO: Update when we have the final list
      seoDescription: 'Support Todd Wolfson via PayPal, Flatter, and Gittip'
    });
  };
};
