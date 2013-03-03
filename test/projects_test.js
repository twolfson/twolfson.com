require('./setup');
describe('twolfson.com/projects', function () {
  before(config.navigateTo('/projects'));

  it('is counting stars', function () {
    console.log(this.body);
  });
});