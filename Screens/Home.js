import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
              
                  if (route.name === 'Choose') {
                    iconName = focused
                      ? 'hand-pointer'
                      : 'hand-pointer';
                  } else if (route.name === 'Apply') {
                    iconName = focused ? 'paperclip' : 'paperclip';
                  }
              
                  // You can return any component that you like here!
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
              >
                <Tab.Screen name="Choose" component={AvailableFiltersStack} />
                <Tab.Screen name ="Apply" component={Filters} />
              </Tab.Navigator>
          );
    }
}


