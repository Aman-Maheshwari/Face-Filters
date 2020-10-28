import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Filters from './Filters'
import Slider from '@react-native-community/slider'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';

export default class AvailableFiltersStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pencil_shade_value: 0.01,
            tap: false,
        }

    }
    componentDidMount() {

    }
    change(value) {
        this.setState(() => {
            return {
                pencil_shade_value: parseFloat(value)
            };
        });
    }

    render() {
        const effects = [
            {
                id:1,
                title:"Pencil Sketch B/W",
                effect:"pencilsketch"
            },
            {
                id:2,
                title:"Water Color",
                effect:"watercolour"
            },
            {
                id:3,
                title:"Oil Paint",
                effect:"oilpaint"
            },
            {
                id:4,
                title:"Pointlissim",
                effect:"pointlissim"
            },
            {
                id:5,
                title:"Pencil Sketch colour",
                effect:"pencilsketchColor"
            },
            {
                id:6,
                title:"Details",
                effect:"details"
            }
        ];

        const Item = ({item, onPress})=>{

        }
        const renderItem=({item})=>{
            return (
                <View style={{flex:1}}>
                    <Item 
                        item = {item}
                        onPress = {()=> this.setState({
                            itemId:item.id
                        })}
                    />
                </View>
            )
        }
        return (
        //     <View style={styles.container}>
        //         <TouchableOpacity
        //             onPress={() => {
        //                 this.setState({
        //                     tap: !this.state.tap
        //                 })
        //             }}
        //         >
        //             <View>
        //                 {this.state.tap === false ?
        //                     <Text>
        //                         Pencil Sketch B/W
        //                     </Text>
        //                     :
        //                     <View>
        //                         <Text>
        //                             Pencil Sketch B/W
        //                         </Text>
        //                         <Text>{this.state.pencil_shade_value}</Text>
        //                         <Slider
        //                             step={0.01}
        //                             maximumValue={0.1}
        //                             onValueChange={this.change.bind(this)}
        //                             value={this.state.pencil_shade_value}
        //                         />
        //                         <TouchableOpacity onPress={() => {
        //                             this.props.navigation.navigate('Filters', {
        //                                 effect: 'pencilsketchBW'
        //                             })
        //                         }}>
        //                             <Text> apply effect</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 }
        //             </View>
        //         </TouchableOpacity>



        //         <TouchableOpacity style={styles.container_effect}
        //             onPress={
        //                 () => {
        //                     this.props.navigation.navigate('Filters', {
        //                         effect: 'watercolour'
        //                     })
        //                 }
        //             }
        //         >
        //             <View>
        //                 <Text>
        //                     Water color
        //                 </Text>
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={() => {
        //                 this.props.navigation.navigate('Filters', {
        //                     effect: 'oilpaint'
        //                 })
        //             }}
        //         >
        //             <View>
        //                 <Text>
        //                     Oil Paint
        //                 </Text>
        //             </View>
        //         </TouchableOpacity>



        //         <TouchableOpacity
        //             onPress={() => {
        //                 this.props.navigation.navigate('Filters', {
        //                     effect: 'pencilsketchColor'
        //                 })
        //             }}
        //         >
        //             <View>
        //                 <Text>
        //                     Pencil Sketch colour
        //                 </Text>
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity>
        //             <View>
        //                 <Text>
        //                     Details
        //                 </Text>
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity>
        //             <View>
        //                 <Text>
        //                     pointlissim
        //                 </Text>
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity>
        //             <View>
        //                 <Text>
        //                     random
        //                 </Text>
        //             </View>
        //         </TouchableOpacity>
        //     </View>

        <View style={styles.container}>
            <View style={styles.upperContainer}>
                
            </View>
            <View style={styles.lowerContainer}>
                <FlatList 
                    data={effects}
                    renderItem={renderItem}
                    keyExtractor={(item)=>item.id}
                />
            </View>

        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#E9F4F1"
    },
    container_effect: {
        marginVertical: hp('5%'),
        elevation:0.5,   
    },
})
