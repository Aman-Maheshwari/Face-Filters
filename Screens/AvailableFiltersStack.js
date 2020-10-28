import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Filters from './Filters'
import Slider from '@react-native-community/slider'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';

export default class AvailableFiltersStack extends React.Component {
    constructor(props) {
        const effects = [
            {
                id: 1,
                title: "Pencil Sketch B/W",
                effect: "pencilsketch",
                tap: false,
                InnerPropertyexist: true
            },
            {
                id: 2,
                title: "Water Color",
                effect: "watercolour",
                tap: false,
                InnerPropertyexist: true
            },
            {
                id: 3,
                title: "Oil Paint",
                effect: "oilpaint",
                tap: false,
                InnerPropertyexist: true
            },
            {
                id: 4,
                title: "Pointlissim",
                effect: "pointlissim",
                tap: false,
                InnerPropertyexist: true
            },
            {
                id: 5,
                title: "Pencil Sketch colour",
                effect: "pencilsketchColor",
                tap: false,
                InnerPropertyexist: true
            },
            {
                id: 6,
                title: "Details",
                effect: "details",
                tap: false,
                InnerPropertyexist: true
            }
        ];
        super(props);
        this.state = {
            effects: effects,
            pencil_shade_value: 0.01,
            tap: false,
            refresh: false
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
        const Item = ({ item, index }) => {
            return (
                <View>
                    {item.tap == false ?
                        <TouchableOpacity
                            onPress={() => updateTap({ item, index })}
                            style={styles.FlatlistElement}>
                            <Text>
                                {item.title}
                            </Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity
                            onPress={() => updateTap({ item, index })}
                            style={styles.FlatlistElement}
                        >
                            <View style={styles.applyEffect}>
                                <Text>
                                    {item.title}
                                </Text>
                                <Text>apply effect</Text>
                            </View>
               
                            <Text>{this.state.pencil_shade_value}</Text>
                            <Slider
                                step={0.01}
                                maximumValue={0.1}
                                onValueChange={this.change.bind(this)}
                                value={this.state.pencil_shade_value}
                            />
                        </TouchableOpacity>

                    }

                </View>

            )
        }

        const updateTap = ({ item, index }) => {
            let { effects } = this.state;
            let target = effects[index]
            target.tap = !target.tap;
            effects[index] = target
            this.setState({
                refresh: !this.state.refresh,
                effects: effects
            })

        }

        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.FlatList_InnerContainer}>
                    <Text style={styles.id}>{item.id}</Text>
                    <Item
                        item={item}
                        index={index}
                    />
                </View>
            )
        }


        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                </View>
                <View style={styles.FlatList_MainContainer}>
                    <FlatList
                        data={this.state.effects}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={this.state.refresh}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EEEE"
    },
    container_effect: {
        marginVertical: hp('5%'),
        elevation: 0.5,
    },
    upperContainer:{
        flex:0.4
    },
    FlatList_MainContainer: {
        flex:0.6
    },
    FlatList_InnerContainer: {
        height: hp('10%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('5%'),
        borderRadius: wp('5%'),
        borderColor: "#65E4D7",
        borderWidth: wp('0.5%'),
        flexDirection: "row",
    },
    id: {
        color: "black",
        elevation:2,
        textAlign:"center",
        borderRadius:wp('7.5%')/2,
        width:wp('7.5%'),
        height:wp('7.5%'),
        backgroundColor:"white",
        marginVertical:hp('2.5%'),
        marginLeft:-13,
        borderColor:"#65E4D7",
        borderWidth: wp('0.5%'),

    },
    applyEffect:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"green"
    },
    FlatlistElement: {
        marginHorizontal: wp('8%'),
        marginVertical: hp('1%'),
        width: wp('70%'),
        flexDirection:"column",
        backgroundColor:"pink"
    }
})
