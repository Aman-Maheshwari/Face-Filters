import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker'
import * as api from './APIs/CommonApis'

export default class Appp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: '',
      imgurii: '',
      text:'',
      api:api
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
            width:100,
            height:100
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
            }
          });
      })
      .catch(err => console.log(err)
      );
  }
  
  getImage = () => {
    console.log("inside get");
    var fetchImage = new Promise((resolve, reject) => {
      const options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 1,
        rotation: 360,
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

    fetchImage.then(async(result) => {
      console.log("Promise Working ", result)
      Image.getSize(result, (width, height) => {this.setState({width, height})});
      return this.callFunctionAPI(result)
    }).catch(()=>{

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
            <View>
              {this.state.text !== '' ?
              <View>
               
                  <Text>
                  {this.state.text}
                    </Text>
              
                    
              </View>
              :
              null
            } 
        
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};


