import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import Home from './Home'

export default class ResponseWaitLoader extends React.Component{
    render() {
        return <LottieView source={require('../Assets/Loaders/ImageWait.json')} autoPlay loop />;
      }
}
