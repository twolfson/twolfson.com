# Load in our dependencies
# Forking from http://matplotlib.org/xkcd/examples/showcase/xkcd.html
from matplotlib import pyplot as plt
import numpy as np

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
    # Define our style as
    plt.xkcd()

    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    plt.xticks([])
    plt.yticks([])
    ax.set_ylim([-30, 10])

    data = np.ones(100)
    data[70:] -= np.arange(30)

    plt.annotate(
        'THE DAY I REALIZED\nI COULD COOK BACON\nWHENEVER I WANTED',
        xy=(70, 1), arrowprops=dict(arrowstyle='->'), xytext=(15, -10))

    plt.plot(data)

    plt.xlabel('time')
    plt.ylabel('my overall health')

    # fig = plt.figure()
    # ax = fig.add_subplot(1, 1, 1)
    # ax.bar([-0.125, 1.0-0.125], [0, 100], 0.25)
    # ax.spines['right'].set_color('none')
    # ax.spines['top'].set_color('none')
    # ax.xaxis.set_ticks_position('bottom')
    # ax.set_xticks([0, 1])
    # ax.set_xlim([-0.5, 1.5])
    # ax.set_ylim([0, 110])
    # ax.set_xticklabels(['CONFIRMED BY\nEXPERIMENT', 'REFUTED BY\nEXPERIMENT'])
    # plt.yticks([])

    plt.title("CLAIMS OF SUPERNATURAL POWERS")

    # plt.show()
    plt.savefig('hi.png')

if __name__ == '__main__':
    main()
