## Get started

run `python ./real-program.py`
it will ask you for a image
give it the path of the image and press enter
it will draw the contours on the image and ask if the contour is selected correctly
with correct drawn contour user can proceed answering `y`
it than process the image and output TOTAL for the receipt.

## Output

In order to further split the bill, it can store/print all the extracted text to a file.
the extracted text can then be pick-up by a NLP model to ouput a table of ordered items and their price.

## Other files
`functions.py` contains the functions `real-program.py` needs.

`receipt-ocr-part-1-image-segmentation-by-opencv.ipynb` and `receipt-ocr-part-2-text-recognition-by-tesseract.ipynb` are the resources used
