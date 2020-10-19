import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loader from './Screens/Loader'
import Home from './Screens/Home'
import AvailableFiltersStack from './Screens/AvailableFiltersStack'
import Filters from './Screens/Filters'

const Stack = createStackNavigator();

export default class App extends React.Component{
 
    componentDidMount(){

    }
   
    render() {
       return(
           <NavigationContainer>
               <Stack.Navigator>
                   <Stack.Screen name = "Loader" component = {Loader} options={{ headerShown: false }} />
                   <Stack.Screen name = "Home" component ={Home} options={{ headerShown: false }} />
               </Stack.Navigator>
           </NavigationContainer>
       )
    }
    
}
