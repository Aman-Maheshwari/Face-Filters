import React from 'react';
import LottieView from 'lottie-react-native';


export default class ResponseWaitLoader extends React.Component{
    render() {
        return <LottieView source={require('../Assets/Loaders/ImageWait.json')} autoPlay loop />;
      }
}
