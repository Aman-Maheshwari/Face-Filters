import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';

export default class AvailableFiltersStack extends React.Component{
    componentDidMount(){

    }
    render() {
       return(
           <View style={{flex:1}}>
               <TouchableOpacity
                onPress ={
                    ()=>{
                        this.props.navigation.navigate('Filters',{
                            effect:'watercolour'
                        })
                    }
                }
               >
                   <View>
                       <Text>
                        Water color
                        </Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity
               onPress={()=>{
                    this.props.navigation.navigate('Filters',{
                        effect:'oilpaint'
                    })
               }}
               >
                   <View>
                       <Text>
                        Oil Paint
                        </Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.navigate('Filters',{
                        effect:'pencilsketchBW'
                    })
                }}
               >
                   <View>
                       <Text>
                        Pencil Sketch B/W
                        </Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.navigate('Filters',{
                        effect:'pencilsketchColor'
                    })
                 }}
                >
                   <View>
                       <Text>
                        Pencil Sketch colour
                        </Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity>
                   <View>
                       <Text>
                        Details 
                        </Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity>
                   <View>
                       <Text>
                        pointlissim
                        </Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity>
                   <View>
                       <Text>
                        random
                        </Text>
                    </View>
               </TouchableOpacity>
           </View>
       )
    }
    
}
