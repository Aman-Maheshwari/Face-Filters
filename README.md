# Face-Filters

### Introduction

An android application for user to either choose the image or capture the photo, and then apply the choosen effect(10 available) on the photo.
The front end send the images as base64 string to the python backend where all the work is done using opencv and the reconstructed image is send back
to the user end for display.

-----

### Technologies used 

- React-Native
- OpenCV
- Python(Flask)

-----


### Running instructions

Clone the repository 


#### Install dependencies

```
cd project/PythonScripts

- sudo apt install libopencv-dev python3-opencv
- pip install opencv-python
- pip install progressbar2
- pip install opencv-contrib-python
```

```
install ngrok

- sudo snap install ngrok
- ngrok http 5000

```

```
update the url provided by ngrok in Project/Screen/Filter.js

```


#### Run Application
```
Run the python script

cd PythonScripts/
- python flask.py

```

```
Run the Android App

Inside project/

- npx react-native run-android
- npx react-native start
```