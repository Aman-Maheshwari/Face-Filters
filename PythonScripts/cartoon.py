# import numpy as np
# from flask import Flask, jsonify, request,send_from_directory,send_file
# import cv2
# import json
# import io
# from imageio import imread
# import base64
# import matplotlib.pyplot as plt
# import sys

# app =Flask(__name__)
# app.config["DEBUG"] = True

# highThresh	= 0.4
# lowThresh		= 0.1
# # imgFileLst	= ('./villageRoad.jpg', './me.jpg','./opencvframe0.png')
# def sobel (img):
# 	'''
# 	Detects edges using sobel kernel
# 	'''
# 	opImgx		= cv2.Sobel(img,cv2.CV_8U,0,1,ksize=5)	#detects horizontal edges
# 	opImgy		= cv2.Sobel(img,cv2.CV_8U,1,0,ksize=5)	#detects vertical edges
# 	#combine both edges
# 	return cv2.bitwise_or(opImgx,opImgy)	#does a bitwise OR of pixel values at each pixel
# def sketch(frame):	
# 	#Blur it to remove noise
# 	frame		= cv2.GaussianBlur(frame,(6,6),cv2.BORDER_DEFAULT)
	
# 	#make a negative image
# 	invImg	= 255-frame
	
# 	#Detect edges from the input image and its negative
# 	edgImg0		= sobel(frame)
# 	edgImg1		= sobel(invImg)
# 	edgImg		= cv2.addWeighted(edgImg0,1,edgImg1,1,0)	#different weights can be tried too
	
# 	#Invert the image back
# 	opImg= 255-edgImg
# 	# imS = cv2.resize(opImg, (960, 540)) 
# 	# cv2.imshow ('imagee',imS)
# 	# cv2.waitKey(0)
# 	# cv2.destroyAllWindows()
# 	return opImg
# @app.route('/',methods=['POST'])
# def getDATA():
# 	x=request.json['base64String']
# 	img = imread(io.BytesIO(base64.b64decode(x)))
# 	cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
# 	filename = "reconstructed.jpg"
# 	cv2.imwrite(filename, cv2_img)
# 	# imS = cv2.resize(cv2_img, (960, 540)) 
# 	# cv2.imshow ('imagee',imS)
# 	# plt.show()
# 	# cv2.waitKey(0)
# 	# cv2.destroyAllWindows()

# 	opImg = sketch(img)
# 	op2_img = cv2.cvtColor(opImg, cv2.COLOR_RGB2BGR)
# 	filename = "reconstructed1.jpg"
# 	cv2.imwrite(filename, op2_img)

# 	# cv2.imshow ('',opImg)
# 	# b64_bytes = base64.b64encode(opImg)
# 	# b64_string = b64_bytes.decode()
# 	# print(sys.getsizeof(b64_string))
# 	# print(b64_string)
# 	# print(x)
# 	return send_file(filename,as_attachment=True,mimetype='image/jpg')
# 	# return json.dumps({'file_id': b64_string ,'filename': "record.filename" , 'links_to' : "record.links_to"})
# if __name__ == '__main__':
# 	app.run()
# 	# for imgFile in imgFileLst:
# 	# 	print (imgFile)
# 	# 	img		= cv2.imread (imgFile,0)
# 	# 	opImg	= sketch(img)	
# 	# 	cv2.imshow (imgFile,opImg)
	

import numpy as np
import matplotlib.pyplot as plt

import cv2
from flask import Flask, jsonify, request,send_from_directory,send_file
import json
import io
from imageio import imread
import base64
import matplotlib.pyplot as plt
import sys

app =Flask(__name__)
app.config["DEBUG"] = True
def cartoon (image):
	num_down = 3      # number of downsampling steps
	num_bilateral = 18  # number of bilateral filtering steps

	img_rgb = image

	# downsample image using Gaussian pyramid
	img_color = img_rgb
	for _ in range(num_down):
		img_color = cv2.pyrDown(img_color)

	# repeatedly apply small bilateral filter instead of
	# applying one large filter
	for _ in range(num_bilateral):
		img_color = cv2.bilateralFilter(img_color, d=9,sigmaColor=9,sigmaSpace=7)

	# upsample image to original size
	for _ in range(num_down):
		img_color = cv2.pyrUp(img_color)

	img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
	img_blur = cv2.medianBlur(img_gray, 5)

	img_edge = cv2.adaptiveThreshold(img_blur, 255,
									cv2.ADAPTIVE_THRESH_MEAN_C,
									cv2.THRESH_BINARY,
									blockSize=9,
									C=2)

									# convert back to color, bit-AND with color image
	img_edge = cv2.cvtColor(img_edge, cv2.COLOR_GRAY2RGB)
	img_cartoon = cv2.bitwise_and(img_color, img_edge)

	# display
	imS = cv2.resize(img_cartoon, (960, 540)) 
	cv2.imshow("cartoon", imS)
	return img_cartoon


@app.route('/',methods=['POST'])
def getDATA():
	x=request.json['base64String']
	img = imread(io.BytesIO(base64.b64decode(x)))
	cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
	filename = "reconstructed.png"
	cv2.imwrite(filename, cv2_img)
	imS = cv2.resize(cv2_img, (960, 540)) 
	cv2.imshow ('imagee',imS)
	# plt.show()
	cv2.waitKey(0)
	cv2.destroyAllWindows()

	opImg = cartoon(img)
	op2_img = cv2.cvtColor(opImg, cv2.COLOR_RGB2BGR)
	filename = "reconstructed1.png"
	cv2.imwrite(filename, opImg)

	# cv2.imshow ('',opImg)
	# b64_bytes = base64.b64encode(opImg)
	# b64_string = b64_bytes.decode()
	# print(sys.getsizeof(b64_string))
	# print(b64_string)
	# print(x)
	return send_file(filename,as_attachment=True,mimetype='image/jpg')


if __name__ == '__main__':
	app.run()