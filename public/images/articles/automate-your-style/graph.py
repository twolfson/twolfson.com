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
    dpi = 72
    fig = pyplot.figure(1, figsize=(600 / dpi, 400 / dpi))

    # Add labels and a title
    pyplot.xlabel('Time')
    pyplot.title('Comments on PRs about style')

    # Define our axes and limits
    # http://matplotlib.org/xkcd/api/pyplot_api.html#matplotlib.pyplot.subplot
    ax = fig.add_subplot(1, 1, 1)  # cols, rows, plot number
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    pyplot.xticks([])
    pyplot.yticks([1, 20])
    ax.set_yticklabels(['0', '20'])
    ax.set_ylim([0, 25])

    # Hide right side of ticks
    # http://stackoverflow.com/questions/9051494/customizing-just-one-side-of-tick-marks-in-matplotlib-using-spines
    ax.yaxis.set_ticks_position('none')

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
    pyplot.savefig('graph.png', dpi=dpi)

if __name__ == '__main__':
    main()
