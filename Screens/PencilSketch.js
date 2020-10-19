import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 'camera',
      imgurii: '',
    }
  }
  callFunctionAPI = (imageuri) => {
    ImgToBase64.getBase64String(imageuri)
      .then(async (base64String) => {
        console.log(base64String);
        var cartoon = await fetch('http://127.0.0.1:5000/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            base64String: base64String,
          })
        }).then(response => response.blob())
          .then(images => {
            console.log("inside", images);
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(images);
            fileReaderInstance.onload = () => {
              this.setState({
                imgurii: fileReaderInstance.result
              })
              // base64data = fileReaderInstance.result;
              // console.log(base64data);
            }
            let imageUri = "data:image/jpg;base64," + images;
   


            // let image = URL.createObjectURL(images)
            // console.log("cartoon = ",image);
          });
        // let json = await cartoon.json()


      })
      .catch(err => console.log(err)
      );
  }

  getImage = () => {
    console.log("inside get");

    var fetchImage = new Promise((resolve, reject) => {

      const options = {
        // title: 'Select Avatar',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 1
        // global.Upload_quality === 'medium' ? 0.8 : global.Upload_quality === 'high' ? 1 : 0.5 //quality of image is decreased 
      };

      //if user wants to click photo using camera ...

      if (this.state.select === 'camera') {
        console.log("inside camera");

        ImagePicker.launchCamera(options, (response) => {
          // Same code as in above section!
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            // console.log("path of file =  ", "file:/" + response.path, " and size = ", response.fileSize, " and uri = ", response.uri);

            //this sets the select parameter to empty again so for the next upload select = ''...
            this.setState({
              select: ''
            })
            resolve(source.uri)
          }
        });

      }

      //if user wants to pick an image from library...
      else {
        ImagePicker.launchImageLibrary(options, (response) => {
          // Same code as in above section!
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            // console.log("path of file =  ", "file:/" + response.path, " and size = ", response.fileSize, " and uri = ", response.uri);

            //this sets the select parameter to empty again so for the next upload select = ''...
            resolve(source.uri)
          }
        });
      }

    })//end of promise fetch image...


    fetchImage.then((result) => {
      console.log("Promise Working ", result)
      this.setState({
        imageURI: result,
      })
      return this.callFunctionAPI(result)
    }).then((data) => {

    })


  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.getImage()
        }}>
          <Text>
            press me to take image
              </Text>
          <View >
            {this.state.imgurii !== '' ?
              <View>
                {console.log('image')}
                <Image source={{ uri: this.state.imgurii, }} style={{ height: 350, width: 350 }} />
              </View>
              :
              null
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};


