import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker'
import Exif from 'react-native-exif'

export default{

  async callFunctionAPI(imageuri){
    ImgToBase64.getBase64String(imageuri)
      .then(async (base64String) => {
        console.log("base64String");
        var cartoon = await fetch('http://127.0.0.1:5000/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            base64String: base64String,
            width:100,
            height:100
          })
        }).then(response => response.blob())
          .then(images => {
            console.log("inside", images);
            return images;
            // const fileReaderInstance = new FileReader();
            // fileReaderInstance.readAsDataURL(images);
            // fileReaderInstance.onload = () => {
            //   // this.setState({
            //   //   imgurii: fileReaderInstance.result
            //   // })
            //   console.log(fileReaderInstance.result);
              
            //   return fileReaderInstance.result
            
          });
      })
      .catch(err => console.log(err)
      );
  }

}