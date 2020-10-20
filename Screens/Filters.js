import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker'
import ResponseWaitLoader from './ResponseWaitLoader'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 
export default class Appp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgurii: '',
            width: null,
            height: null,
            ApiResponse:false,
            Haveimage:false
        }
    }

    callFunctionAPI = (imageuri, effect) => {
        console.log("effect = ", effect);
        ImgToBase64.getBase64String(imageuri)
        .then(async (base64String) => {
                // console.log(base64String);       
                var cartoon = await fetch('http://127.0.0.1:5000/' + effect.effect, {
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        base64String: base64String,
                        width: 100,
                        height: 100
                    })
                }).then(response => response.blob())
                    .then(images => {
                        console.log("inside", images);
                        const fileReaderInstance = new FileReader();
                        fileReaderInstance.readAsDataURL(images);
                        fileReaderInstance.onload = () => {
                            this.setState({
                                imgurii: fileReaderInstance.result,
                                ApiResponse:true
                            })
                        }
                    });
            })
            .catch(err => console.log(err)
            );
    }


    getImage = (effect, select = '') => {
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

            if (select === 'camera') {
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
                        // console.log("path of file =  ", "file:/" + response.path, " and size = ", response.fileSize, " and uri = ", response.uri)
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

        fetchImage.then(async (result) => {
            console.log("Promise Working ", result)
            this.setState({
                Haveimage:true,
                ApiResponse:false
            })
            Image.getSize(result, (width, height) => {
                this.setState({
                    width: width,
                    height: height,
                });                
                this.callFunctionAPI(result, effect)
            }); 
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        var effect = this.props.route.params === undefined ? 'watercolour' :  this.props.route.params
        console.log(effect);
        
        return (
            <View style={{ flex: 1 }}>
                {this.state.Haveimage === false ?
                    <View style={{ alignSelf: "center", marginVertical: 150 }}>
                        {console.log("inside if ")
                        }
                        <TouchableOpacity onPress={() => {
                            this.getImage(effect, 'camera')
                        }}
                            style={{
                                height: 150, width: 150, borderRadius: 150 / 2
                            }}
                        >
                            <View style={{ height: 150, width: 150, borderRadius: 150 / 2, backgroundColor: "#A7F7EF", marginBottom: 20 }}>
                                <Text style={{ color: "white", marginHorizontal: 25, marginVertical: 55, fontSize: 25 }}> Capture</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: 150, width: 150, borderRadius: 150 / 2
                            }}
                            onPress={() => {
                                this.getImage(effect, '')
                            }}
                        >
                            <View style={{ height: 150, width: 150, borderRadius: 150 / 2, backgroundColor: "#F4A8EE", marginTop: 20 }}>
                                <Text style={{ color: "white", marginHorizontal: 25, marginVertical: 55, fontSize: 25 }}> Choose</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ height: 1000 }}>
                        {console.log("inside else")}
                        <View style={{ flex: 0.1, alignSelf: "center", marginVertical: 10, flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => {
                                this.getImage(effect, 'camera')
                            }}
                                style={{
                                    height: 90, width: 90, borderRadius: 90 / 2
                                }}
                            >
                                <View style={{ height: 90, width: 90, borderRadius: 90 / 2, backgroundColor: "#A7F7EF", marginRight: 20 }}>
                                    <Text style={{ color: "white", marginHorizontal: 15, marginVertical: 15, fontSize: 17 }}> Capture</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    height: 90, width: 90, borderRadius: 90 / 2
                                }}
                                onPress={() => {
                                    this.getImage(effect, '')
                                }}
                            >
                                <View style={{ height: 90, width: 90, borderRadius: 90 / 2, backgroundColor: "#F4A8EE", marginLeft: 20 }}>
                                    <Text style={{ color: "white", marginHorizontal: 15, marginVertical: 15, fontSize: 17 }}> Choose</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 0.9, }}>
                            {this.state.ApiResponse == true ?
                            <Image source={{ uri: this.state.imgurii, }} style={{ height: 350, width: 350 }} /> 
                            // <ResponseWaitLoader/>
                            :
                            <View style={{height:350,width:350}}>
                            <ResponseWaitLoader/>
                            </View>
                            }
                            
                        </View>

                    </View>
                }
            </View>
        );
    }
};


