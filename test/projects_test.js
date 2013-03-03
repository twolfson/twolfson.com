require('./setup');
describe('twolfson.com/projects', function () {
  before(config.navigateTo('/projects'));

  it('is counting stars', function () {
    console.log(this.err);
    console.log(this.res);
    console.log(this.body);
  });
});