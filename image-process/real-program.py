import numpy as np
import cv2
import matplotlib.pyplot as plt

import pytesseract
import re

from skimage.filters import threshold_local
from PIL import Image

from pytesseract import Output

from functions import opencv_resize, plot_rgb, plot_gray, get_receipt_contour, contour_to_rect, wrap_perspective, bw_scanner

def usr_input():
    # get the image
    file_name = input("Enter the file name: ")
    # img = Image.open(file_name)
    # img.thumbnail((800,800), Image.ANTIALIAS)

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
    # image_with_contours = cv2.drawContours(image.copy(), contours, -1, (0,255,0), 3)

    # Get 10 largest contours
    largest_contours = sorted(contours, key = cv2.contourArea, reverse = True)[:10]
    image_with_largest_contours = cv2.drawContours(image.copy(), largest_contours, -1, (0,255,0), 3)
    plot_rgb(image_with_largest_contours)
    plt.show()

    return original, largest_contours

# Get the receipt contour for the first time
receipt_contour = None

# loop until receipt contour is found (4 corners are found)
while receipt_contour is None:
    # first time user input
    valid_receipt = False

    # loop until user confirms the receipt and contour look correctly
    while not valid_receipt:
        image, largest_contours = usr_input()
        valid_receipt = input("Is this the correct receipt? (y/n) ").lower() == 'y'
    #---------------------------------------------------------------------------------------------------------------------
    # exiting the while with valid contour on the receipt

    # start processing the receipt with the selected contour
    print("Processing receipt...")
    receipt_contour = get_receipt_contour(largest_contours)

# debugging parts
#---------------------------------------------------------------
# image_with_receipt_contour = cv2.drawContours(image.copy(), [receipt_contour], -1, (0, 255, 0), 2)
# plot_rgb(image_with_receipt_contour)

# scanned = wrap_perspective(image.copy(), contour_to_rect(receipt_contour, resize_ratio))
# plt.figure(figsize=(16,10))
# plt.imshow(scanned)
# plt.show()
#---------------------------------------------------------------

d = pytesseract.image_to_data(image, output_type=Output.DICT)
n_boxes = len(d['level'])
boxes = cv2.cvtColor(image.copy(), cv2.COLOR_BGR2RGB)
for i in range(n_boxes):
    (x, y, w, h) = (d['left'][i], d['top'][i], d['width'][i], d['height'][i])    
    boxes = cv2.rectangle(boxes, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
# plot_rgb(boxes)

extracted_text = pytesseract.image_to_string(image)
# print(extracted_text)

total_pattern = r"(?i)total[\s]*[£$€]?[\s]*([0-9]*[.,][0-9]{2})"
match = re.search(total_pattern, extracted_text)

if match:
    total_amount = match.group(1)
    print(total_amount)
else:
    print("Total amount not found.")