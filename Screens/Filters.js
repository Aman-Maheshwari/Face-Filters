import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    StyleSheet,
    Dimensions
} from 'react-native';

import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker'
import ResponseWaitLoader from './ResponseWaitLoader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Appp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgurii: '',
            width: null,
            height: null,
            ApiResponse: false,
            Haveimage: false,
            networkError:false,
            bg_image_array:[
                require("../Assets/pencil-sketch-BW.jpg"),
                require("../Assets/watercolour.png"),
                require("../Assets/Oil_paint.jpg"),
                require("../Assets/Pointlissim.jpg"),
                require("../Assets/pencil-sketch-Colour.jpg"),
                // require("../Assets/"),
                // require("../Assets/"),
                // require("../Assets/"),
                // require("../Assets/"),
                // require("../Assets/")
            ]
        }
    }

    componentDidMount(){
        this.didFocusListener = this.props.navigation.addListener(
            'focus',
            () => {   
                this.setState({
                imgurii: '',
                width: null,
                height: null,
                ApiResponse: false,
                Haveimage: false,
                networkError:false
            }) },
          );
          
          
        }

    callFunctionAPI = (imageuri, effect,params) => {
        // console.log("effect = ", effect);
        ImgToBase64.getBase64String(imageuri)
            .then(async (base64String) => {
                // console.log(base64String);       
                var cartoon = await fetch('http://127.0.0.1:5000/' + effect, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        base64String: base64String,
                        parameter:params
                    })
                }).then(response => response.blob())
                    .then(images => {
                        // console.log("inside", images);
                        const fileReaderInstance = new FileReader();
                        fileReaderInstance.readAsDataURL(images);
                        fileReaderInstance.onload = () => {
                            this.setState({
                                imgurii: fileReaderInstance.result,
                                ApiResponse: true,
                                networkError:false
                            })
                        }
                    });
            })
            .catch(err => {
                console.log("this is error",err)
                this.setState({
                    networkError:true,
                    ApiResponse:true
                })
            }
            );
    }


    getImage = (effect, select = '' ,parameter) => {
        // console.log("inside get");
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
                // console.log("inside camera");

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
                Haveimage: true,
                ApiResponse: false
            })
            Image.getSize(result, (width, height) => {
                this.setState({
                    width: width,
                    height: height,
                });                
                this.callFunctionAPI(result, effect ,parameter)
            }); 
            // this.callFunctionAPI(result, effect)
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        var effect, background, id, parameter
        try {
            effect = this.props.route.params.effect
            background = this.props.route.params.bg_image
            id = this.props.route.params.id
            parameter =this.props.route.params.parameter
        } catch (error) {
            effect = 'watercolour'
            background = ""
            id = 2
            parameter = 3
        }
        let image  = this.state.bg_image_array[id-1];
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} style={styles.backgroundImage} />
                {this.state.Haveimage === false ?
                    <View style={{ alignSelf: "center", marginVertical: 150 }}>
                        <TouchableOpacity onPress={() => {
                            this.getImage(effect, 'camera',parameter)
                        }}
                            style={{
                                height: 150, width: 150, borderRadius: 150 / 2
                            }}
                        >
                            <View style={{ height: 150, width: 150, borderRadius: 150 / 2, backgroundColor: "#FFd662FF", marginBottom: 20 }}>
                                <Text style={{ color: "white", marginHorizontal: 25, marginVertical: 55, fontSize: 25 }}> Capture</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: 150, width: 150, borderRadius: 150 / 2
                            }}
                            onPress={() => {
                                this.getImage(effect, '' , parameter)
                            }}
                        >
                            <View style={{ height: 150, width: 150, borderRadius: 150 / 2, backgroundColor: "#00539CFF", marginTop: 20 }}>
                                <Text style={{ color: "white", marginHorizontal: 25, marginVertical: 55, fontSize: 25 }}> Choose</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ height: 1000 }}>
                        <View style={{ flex: 0.1, alignSelf: "center", marginVertical: 10, flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => {
                                this.getImage(effect, 'camera' , parameter)
                            }}
                                style={{
                                    height: 90, width: 90, borderRadius: 90 / 2
                                }}
                            >
                                <View style={{ height: 90, width: 90, borderRadius: 90 / 2, backgroundColor: "#FFd662FF", marginRight: 20 }}>
                                    <Text style={{ color: "white", marginHorizontal: 15, marginVertical: 15, fontSize: 17 }}> Capture</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    height: 90, width: 90, borderRadius: 90 / 2
                                }}
                                onPress={() => {
                                    this.getImage(effect, '' ,parameter)
                                }}
                            >
                                <View style={{ height: 90, width: 90, borderRadius: 90 / 2, backgroundColor: "#00539CFF", marginLeft: 20 }}>
                                    <Text style={{ color: "white", marginHorizontal: 15, marginVertical: 15, fontSize: 17 }}> Choose</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 0.9, }}>
                            {this.state.ApiResponse == true ?
                                <View>
                                {this.state.networkError == false ?
                                    <Image source={{ uri: this.state.imgurii, }} style={styles.DisplayImage} />
                                 : 
                                    <Text style = {{textAlign:"center",marginVertical:hp('12%')}}>Oopss!! Please Check Your Internet Connection!!</Text>
                                 }    
                                </View>
                                :
                                <View style={styles.DisplayLoader}>
                                    <ResponseWaitLoader />
                                </View>
                            }
                            
                        </View>
                    </View>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    DisplayImage:{
        height:hp('50%'), 
        width: wp('85%'),
        marginVertical:50,
        marginHorizontal:30,
        borderRadius:5,
        borderWidth:5,
        borderColor:"white",
        // elevation:4

    },
    DisplayLoader:{
        height:hp('50%'), 
        width: wp('85%'),
        marginVertical:50,
        marginHorizontal:30,
        borderRadius:4,
        borderWidth:2,
        borderColor:"white",
        elevation:4,
        backgroundColor:"#FFFFFF"
    }
})

