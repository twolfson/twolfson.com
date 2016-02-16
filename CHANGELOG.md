# twolfson.com changelog
3.83.0 - Added "Trying something new" article

3.82.0 - Updated project stats

3.81.0 - Removed missed TODOs from CSS

3.80.0 - Cleaned up CSS for easier management and better names

3.79.2 - Accepted latest perceptual diffs

3.79.1 - Added missing smoke tests for `/license` and `/support-me` and added back missing supportMe config

3.79.0 - Moved to SOPS for secret management

3.78.0 - Added "Open source server management" article

3.77.1 - Fixed up broken tests

3.77.0 - Updated projects to current preferences and latest stats

3.76.0 - Removed competitions section from projects due to MDN Dev Derby deprecation and lack of content

3.75.1 - Accepted latest perceptual diffs

3.75.0 - Wrote "Design for developers" article

3.74.0 - Added `bin/deploy-install.sh` for consistent deployment scripts in `twolfson.com-scripts`

3.73.1 - Added missing gzip test to production tests

3.73.0 - Added AMA article

3.72.0 - Wrote "Why I am still a software engineer" article

3.71.0 - Restricted listening hostname from 0.0.0.0 to 127.0.0.1

3.70.0 - Wrote "3 stages of learning" article

3.69.3 - Removed running perceptual diffs on test

3.69.2 - Documented writing an article

3.69.1 - Accepted latest perceptual diffs

3.69.0 - Added "Major releases in spritesmith" article

3.68.1 - Accepted latest perceptual diffs

3.68.0 - Added "How to stay passionate about open source" article

3.67.0 - Upgraded jojo and moved to timezone aware dates

3.66.0 - Moved to slug URLs with 301 redirects at old locations

3.65.1 - Accepted latest perceptual diffs and adjusted Travis CI settings

3.65.0 - Updated activity to include "foundry v4"

3.64.0 - Added "Release: foundry v4" article

3.63.1 - Added local `foundry` for releases (previously global)

3.63.0 - Added "victorious-git" to activity

3.62.1 - Accepted latest perceptual diffs

3.62.0 - Added "Minimizing merge conflicts" article

3.61.1 - Accepted latest perceptual diffs

3.61.0 - Updated activity

3.60.0 - Added "Slack's source code is beautiful" article

3.59.1 - Accepted latest perceptual diffs

3.59.0 - Updated project statistics and repo URLs again

3.58.1 - Accepted latest perceptual diffs

3.58.0 - Updated project statistics and repo URLs

3.57.1 - Accepted latest perceptual diffs

3.57.0 - Added "IDEO U" to activity

3.56.0 - Added "Learning to forget" article

3.55.1 - Accepted latest perceptual diffs

3.55.0 - Updated project stats and added/removed projects

3.54.1 - Accepted latest perceptual diffs

3.54.0 - Updated blog activity

3.53.0 - Added "Retina sprites are here" article

3.52.1 - Accepted latest perceptual diffs

3.52.0 - Upgraded to `grunt-spritesmith@4.5.0` and added retina sprites

3.51.0 - Added minor cleanups discovered during Jade transition

3.50.0 - Moved from EJS to Jade

3.49.0 - Cleaned up EJS and made loops saner to make Jade transition easier

3.48.1 - Accepted latest perceptual diffs

3.48.0 - Updated "Recent activity"

3.47.0 - Wrote "Automate your style" article

3.46.1 - Fixed missing dependency in Vagrant and got working perceptual diffs

3.46.0 - Wrote "Testing with other services" article

3.45.0 - Upgraded to `grunt-spritesmith@3.5.0` to pick up `spritesheet` variables/mixins

3.44.0 - Built latest set of files

3.43.0 - Updated `gittip` references to `gratipay`

3.42.0 - Upgraded to `grunt-spritesmith@3.1.0`

3.41.0 - Wrote "Moving from PhantomJS to node-webkit" article

3.40.0 - Moved to `node-webkit` for screenshotting

3.39.0 - Added `twofson-style` for consistent linting/styles

3.38.0 - Missed merge for `3.37.0`

3.37.0 - Updated activity to include AST work

3.36.0 - Wrote up "Welcome back" article

3.35.0 - Updated all visionmedia URLs to their new counterparts

3.34.1 - Accepted latest perceptual diffs and fixed `npm@2` + Travis CI issue

3.34.0 - Updated title from "JavaScript Developer" to "Software Engineer"

3.33.0 - Added more projects to contributions

3.32.0 - Updated project statistics once more

3.31.0 - Updated project list and statistics

3.30.0 - Completed "Taking a break" article

3.29.0 - Explored granular configurations

3.28.0 - Improved documentation

3.27.0 - Updated blog activity

3.26.1 - Fix Travis CI semver issues

3.26.0 - Added article for "Taken for granted: Regression tests"

3.25.0 - Updated activity with "Reverse templating"

3.24.3 - Re-enabling Travis CI testing for /projects due to HTML entity issue itself -_-;;. Reference discussion: https://github.com/travis-ci/travis-ci/issues/2095

3.24.2 - Disabling Travis CI testing for /projects temporarily due to HTML entity issue

3.24.1 - Accepted latest perceptual diffs

3.24.0 - Added article for "Release: foundry"

3.23.2 - Fixed perceptual diff regression

3.23.1 - Updated Travis CI to be aggressive with notifications

3.23.0 - Updated blog activity to include `twolfson.com` refresh

3.22.0 - Added 'Visual regression testing' article

3.21.0 - Integrated perceptual diffs into Travis CI (sacrificing accuracy for now)

3.20.0 - Updated `npm start` to point to `bin/twolfson.com`

3.19.0 - Refactored projects to use Backbone and be more scriptable

3.18.1 - Updated README with latest structure

3.18.0 - Removed production tests and added Travis CI for integration tests

3.17.0 - Added error handlers

3.16.1 - Accepted latest perceptual diffs

3.16.0 - Moved server start to an executable script

3.15.0 - Repaired broken state of projects

3.14.0 - Removed inDevelopment/inProduction from config

3.13.0 - Added test for environment and RSS

3.12.0 - Updated references to env

3.11.3 - Relocated underscore dependency

3.11.2 - Fixed broken RSS feed

3.11.1 - Fixed up ordering of 'support-me' config

3.11.0 - Moved to shallow-settings for per-environment configuration

3.10.0 - Refactored `lib` with split routes/controllers convention. Fixes #24

3.9.0 - Refactored tests to start up/tear down server

3.8.0 - Deleted unused images

3.7.0 - Deleted unused portfolio files

3.6.0 - Removing carriage returns for good

3.5.0 - Moved to `image-diff` and hardened perceptual diffs

3.4.0 - Reverted since we were too aggressive

3.3.0 - Removed all carriage returns. Fixes #23

3.2.1 - Fixed up keywords for suggested reading article

3.2.0 - Wrote "Suggested reading for writing a gulp plugin" article

3.1.0 - Moved from `express.bodyParser` to `express.urlencoded` to fix error messages

3.0.0 - Moved to white color theme:

- Removed row coloring
- Added transition colors to links, inputs, and textareas
- Made support page buttons consistent with contact form
- Removed less_css folder
- Removed white plaster image

2.23.0 - Updated "Current focus"

2.22.0 - Added article for "Low tech dependency management"

2.21.0 - Moved to `Ubuntu Mono` and scrolling `code` blocks

2.20.0 - Moved "Support Me" from standalone images to sprites

2.19.0 - Added "Support Me" page

2.18.0 - Relocated grunt-curl for highlight.js into separate file

2.17.0 - Added article for release of `sublime-plugin-tests`

2.16.1 - Added regression test for environment on production

2.16.0 - Adjusted environment info and exposed via /health

2.15.1 - Accepting latest perceptual diffs

2.15.0 - Added "Optimal lines again" article

2.14.0 - Added "UNLICENSE all the things" article

2.13.0 - Added `gifsockets` to projects page

2.12.0 - Added "Release: gifsockets" article

2.11.1 - Removed dead code in highlight-yaml

2.11.0 - Fixed up all highlight files

2.10.0 - Added "How to linkify Markdown headers" article

2.9.0 - Expanded highlight.js and added alias for `javascript` language as `js`

2.8.0 - Added "Website redesigned and refactored" article

2.7.1 - Upcast markdown headers to proper levels. Downcast header interpretation to go down one level

2.7.0 - Removed underlining of stars and forks from projects page due to broken visuals

2.6.0 - Added links to each blog header

2.5.1 - Fixed grunt dependency

2.5.0 - Linkified "Todd Wolfson" to point to `/`

2.4.0 - Added reading time to RSS

2.3.0 - Filled out related articles and projects

2.2.2 - Accepting perceptual diffs

2.2.1 - Tweak vertical alignment of header sprites again

2.2.0 - Fixed up vertical alignment of header sprites

2.1.0 - Fixed up styles for contact page

2.0.0 - Major redesign and refactor:

- Upgraded from grunt@0.3 to grunt@0.4
- Moved from LESS to SASS
- Moved from Bootstrap to inuit.css
- Moved from camelCase / hyphen-case CSS classes to BEM classes
- Increased base font size to 18px
- Updated hero font to Lato
- Added grid preview via `?grid` on any URL when in dev
- Updated project stats
- Added activity section to homepage
- Added related articles / projects section to articles

1.26.1 - Fix for dev dependencies on `js-yaml`

1.26.0 - Added SEO keywords and description for all pages and articles

1.25.0 - Overhauled routes into a split of routes and bindings

1.24.2 - Fixed broken test

1.24.1 - Fixing broken `npm start`

1.24.0 - Starting structural cleanup

1.23.1 - Fixed broken perceptual diffs

1.23.0 - Added "Life view: What shapes the self" article

1.22.0 - Added "Life view: Free Will" article

1.21.0 - Added "Release: git sqwish" article

1.20.0 - Adding Google Analytics tracking for links

1.19.0 - Corrected double paragraphs on homepage

1.18.0 - Added link to Gittip via 'support me'

1.17.1 - Corrected summary for 'Blog Launch'

1.17.0 - Updated projects and arrangement

1.16.0 - Wrote article about debugging OSX via Sauce Labs

1.15.0 - Wrote article about debugging Travis CI

1.14.0 - Wrote article about optimal line length theory

1.13.0 - Moved to latest `jojo` and removed `EMFILE` performance bottleneck

1.12.1 - Fixed emailjs version due to Google auth issues

1.12.0 - Removed jQuery and trunkata

1.11.0 - Updated contact page tags

1.10.0 - Added /license page

1.9.0 - Minor cleanup and updated footer to use MIT License

1.8.2 - Tweaking closing section of "Readability: Formalized"

1.8.1 - Re-ran `grunt` to re-compile JS and CSS

1.8.0 - Added "Readability: Formalized" article

1.7.0 - Added "Sexy bash prompt" article

1.6.0 - Rearranged projects

1.5.3 - Added LICENSE-MIT

1.5.2 - Updated donations section

1.5.1 - Allowing perceptual diffs of different sized images and accepted perceptual changes

1.5.0 - Wrote Develop Faster article

1.4.1 - Deleted `TODO.txt` and moved issues into GitHub

1.4.0 - Updated projects with more widely usable projects

1.3.0 - Added perceptual diff "tests" and various cleanup

1.2.0 - Wrote up Abandoning kaleidoscope article

1.1.1 - Added private marker to `package.json` to prevent accidental publishes

1.1.0 - Fixes to `package.json`, added CHANGELOG.md

Before 1.1.0 - See `git log`
