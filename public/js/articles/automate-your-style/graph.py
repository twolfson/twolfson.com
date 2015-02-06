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

    # Add labels and a title
    pyplot.xlabel('Time')
    pyplot.title('Comments on PRs about style')

    # Define our axes and limits
    # http://matplotlib.org/xkcd/api/pyplot_api.html#matplotlib.pyplot.subplot
    ax = fig.add_subplot(1, 1, 1)  # cols, rows, plot number
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    pyplot.xticks([])
    # TODO: Hide right side of tick
    pyplot.yticks([20])
    ax.set_ylim([0, 25])

    # Generate 100 nodes for our graph and draw them
    # http://wiki.scipy.org/Numpy_Example_List#fill
    data = numpy.zeros(100)
    data.fill(20)
    inflection_point = 50
    data[inflection_point:inflection_point+9] = numpy.arange(20, 2, -2)
    data[inflection_point+9:] = numpy.ones(100 - (inflection_point + 9))
    pyplot.plot(data)

    # Add our annotation
    pyplot.annotate(
        'Introduction of `jscs`',
        xy=(inflection_point, 20), arrowprops=dict(arrowstyle='->'), xytext=(10, 15))

    # Save the image
    pyplot.savefig('graph.png')

if __name__ == '__main__':
    main()
