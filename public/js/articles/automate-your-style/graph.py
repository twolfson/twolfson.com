# Load in our dependencies
# Forking from http://matplotlib.org/xkcd/examples/showcase/xkcd.html
from matplotlib import pyplot
import numpy

"""
 Comments on PRs about style

20 | --------\
   |          |
   |          |
   |          |
   |          |
 1 |          \--\
 0 |              -------
   -----------------------
            |
   Introduction of `jscs`

          Time
"""


def main():
    """Generate and save an image as per the docstring above"""
    # Define our style as XKCD
    pyplot.xkcd()

    # Start a new graph
    fig = pyplot.figure()

    # Define our axes and limits
    ax = fig.add_subplot(1, 1, 1)
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    pyplot.xticks([])
    pyplot.yticks([])
    ax.set_ylim([-30, 10])

    # Generate 100 nodes for our graph
    data = numpy.ones(100)
    data[70:] -= numpy.arange(30)
    print data

    pyplot.annotate(
        'THE DAY I REALIZED\nI COULD COOK BACON\nWHENEVER I WANTED',
        xy=(70, 1), arrowprops=dict(arrowstyle='->'), xytext=(15, -10))

    pyplot.plot(data)

    pyplot.xlabel('time')
    pyplot.ylabel('my overall health')
    pyplot.title('CLAIMS OF SUPERNATURAL POWERS')

    pyplot.savefig('hi.png')

if __name__ == '__main__':
    main()
