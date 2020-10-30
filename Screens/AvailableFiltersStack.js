import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Filters from './Filters'
import Slider from '@react-native-community/slider'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import * as effects from './EffectsName'

export default class AvailableFiltersStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            effects:effects.default,
            pencil_shade_value: 0.01,
            tap: false,
            refresh: false
        }
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
                        <View style={styles.applyEffect}>
                            <TouchableOpacity
                                onPress={() => updateTap({ item, index })}
                                style={styles.FlatlistElement}
                            >
                                <Text>
                                    {item.title}
                                </Text>
                                <Text>{this.state.pencil_shade_value}</Text>
                                <Slider
                                    step={0.01}
                                    maximumValue={0.1}
                                    onValueChange={this.change.bind(this)}
                                    value={this.state.pencil_shade_value}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{justifyContent:"center",marginLeft:-15}}
                            onPress={()=>{
                                this.props.navigation.navigate('Filters',{
                                    effect:item.effect,
                                    // bg_image:item.background
                                })
                            }}>
                                <Text>apply effect</Text>
                            </TouchableOpacity>
                        </View>

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
    upperContainer: {
        flex: 0.4
    },
    FlatList_MainContainer: {
        flex: 0.6
    },
    FlatList_InnerContainer: {
        height: hp('10%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('5%'),
        borderRadius: wp('2%'),
        borderColor: "#65E4D7",
        borderWidth: wp('0.5%'),
        flexDirection: "row",
    },
    id: {
        color: "black",
        elevation: 2,
        textAlign: "center",
        borderRadius: wp('7.5%') / 2,
        width: wp('7.5%'),
        height: wp('7.5%'),
        backgroundColor: "white",
        marginVertical: hp('2.5%'),
        marginLeft: -13,
        borderColor: "#65E4D7",
        borderWidth: wp('0.5%'),
    },
    applyEffect: {
        flexDirection: "row",     
    },
    FlatlistElement: {
        marginHorizontal: wp('8%'),
        marginVertical: hp('1%'),
        width: wp('50%'),
        flexDirection: "column",
    }
})
