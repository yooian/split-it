import numpy as np
import cv2
import matplotlib.pyplot as plt

from skimage.filters import threshold_local
from PIL import Image

from functions import opencv_resize, plot_rgb, plot_gray

def usr_input():
    # get the image
    file_name = input("Enter the file name: ")
    img = Image.open(file_name)
    img.thumbnail((800,800), Image.ANTIALIAS)

    # # show the thumbnail
    # plt.imshow(img)
    # plt.axis('off')
    # plt.show()

    image = cv2.imread(file_name)
    # Downscale image as finding receipt contour is more efficient on a small image
    resize_ratio = 500 / image.shape[0]
    original = image.copy()
    image = opencv_resize(image, resize_ratio)

    # Convert to grayscale for further processing
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # plot_gray(gray)

    # Get rid of noise with Gaussian Blur filter
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    # plot_gray(blurred)

    # Detect white regions
    rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 15))
    dilated = cv2.dilate(blurred, rectKernel)
    # plot_gray(dilated)

    edged = cv2.Canny(dilated, 10, 200, apertureSize=3)
    # plot_gray(edged)

    # Detect all contours in Canny-edged image
    contours, hierarchy = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    image_with_contours = cv2.drawContours(image.copy(), contours, -1, (0,255,0), 3)
    plot_rgb(image_with_contours)
    plt.show()

valid_receipt = False
while not valid_receipt:
    usr_input()
    valid_receipt = input("Is this the correct receipt? (y/n) ").lower() == 'y'

print("Processing receipt...")
