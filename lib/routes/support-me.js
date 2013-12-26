module.exports = function (config) {
  return function renderIndex (req, res) {
    res.render('support-me', {
      page: 'support-me',
      // TODO: Include the page of origin from URL
      title: 'Todd Wolfson - Support Me',
      seoKeywords: 'Todd Wolfson, twolfson, twolfsn, support me, paypal, gittip',
      // TODO: Update when we have the final list
      seoDescription: 'Support Todd Wolfson via PayPal, Flatter, and Gittip'
    });
  };
};
