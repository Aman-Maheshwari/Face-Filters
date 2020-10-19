import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AvailableFiltersStack from './AvailableFiltersStack'
import Filters from './Filters'
const Tab = createBottomTabNavigator();

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){

    }
    render(){
        //by default one is choosen at random and others are in stack     
        return (
              <Tab.Navigator
                // initialRouteName="OilPaint"
                // backBehavior={"none"}
                // tabBarOptions={{
                //     activeTintColor: '#e91e63',
                //     tabStyle: {
                //         width: 'auto',
                //         height: 'auto',
                //     },
                // }}
              >
                <Tab.Screen name="Choose Filters" component={AvailableFiltersStack} />
                <Tab.Screen name ="Try Filter" component={Filters} />
              </Tab.Navigator>
          );
    }
}