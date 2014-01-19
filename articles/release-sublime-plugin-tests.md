{
  "title": "Release: sublime-plugin-tests",
  "author": "Todd Wolfson",
  "date": "2013/12/26",
  "keywords": "sublime, sublime text, plugin, test",
  "summary": "[Sublime Text](http://sublimetext.com/) plugin testing framework"
}

Introducing the first [Sublime Text plugin testing framework][plugin-tests]. Now you can rest easy and iterate faster with cross-version tests that integrate with [Vagrant][] and [Travis CI][].

[plugin-tests]: https://github.com/twolfson/sublime-plugin-tests
[Vagrant]: http://www.vagrantup.com/
[Travis CI]: http://travis-ci.org/

https://github.com/twolfson/sublime-plugin-tests

```python
# Load in test framework
from sublime_plugin_tests import framework

# Define a TestCase
class TestLeftDelete(framework.TestCase):
    def test_left_delete_single(self):
        # Each test function *must* return Python with
        # a `run` function. `run` will be run inside
        # Sublime Text. Perform your assertions etc there.
        return """
# Use ScratchView utility provided by `sublime_plugin_tests`
from utils.scratch_view import ScratchView

def run():
  # Generate new scratch file
  scratch_view = ScratchView()
  try:
      # Update the content and selection `ab|c`
      scratch_view.set_content('abc')
      scratch_view.set_sel([(2, 2)])

      # Delete one character to the left `a|c
      scratch_view.run_command('left_delete')

      # Assert the current content
      assert scratch_view.get_content() == 'ac'
  finally:
      # No matter what happens, close the view
      scratch_view.destroy()
"""
```

```bash
$ # Run tests via nosetests
$ nosetests
.
-------------------------------------
Ran 1 test in 0.076s

OK
```
