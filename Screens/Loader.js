import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import Home from './Home'

export default class Loader extends React.Component{
    render() {
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 505);
        return <LottieView source={require('../Assets/Loaders/AppLoader.json')} autoPlay loop />;
      }
}
