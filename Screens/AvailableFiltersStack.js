import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import * as effects from './EffectsName'

export default class AvailableFiltersStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            effects: effects.default,
            parameter_value: 0.01,
            tap: false,
            refresh: false,
            oil_paint_stroke: 20,
            oil_paint_false_countours: 5
        }
    }
    change(value) {
        this.setState(() => {
            return {
                parameter_value: parseFloat(value)
            };
        });
    }

    render() {
        const Item = ({ item, index }) => {
            return (
                <View >
                    {item.tap == false ?
                        <TouchableOpacity
                            onPress={() => updateTap({ item, index })}
                            style={styles.FlatlistElement_before}>
                            <Text style={styles.TextStyle_before}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>

                        :

                        <View style={styles.applyEffect}>
                            <TouchableOpacity
                                onPress={() => updateTap({ item, index })}
                                style={styles.FlatlistElement_after}
                            >
                                <Text style={styles.TextStyle_before}>
                                    {item.title}
                                </Text>
                                {item.InnerPropertyexist === true ?
                                    <View>
                                        <Text style={styles.TextStyle_after}>{item.parameterName}</Text>

                                        <Text style={styles.TextStyle_after}>{this.state.parameter_value}</Text>
                                        <Slider
                                            step={item.parameterStep}
                                            maximumValue={item.maximumParameterValue}
                                            onValueChange={this.change.bind(this)}
                                            value={this.state.parameter_value}
                                        />
                                    </View>
                                    :
                                    null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: "center", marginLeft: -20 }}
                                onPress={() => {
                                    this.props.navigation.navigate('Apply', {
                                        effect: item.effect,
                                        bg_image: item.background,
                                        id: item.id,
                                        parameter:this.state.parameter_value
                                    })
                                }}>
                                <Text style={styles.TextStyle_after_for_applyEffect}>apply effect</Text>
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
        backgroundColor: "#FFFAF1"
    },
    container_effect: {
        marginVertical: hp('5%'),
        elevation: 0.5,
    },
    upperContainer: {
        flex: 0.4
    },
    FlatList_MainContainer: {
        flex: 0.6,
    },
    FlatList_InnerContainer: {
        height: hp('13%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('5%'),
        borderRadius: wp('2%'),
        borderColor: "#ABDFF6",
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
        backgroundColor: "#FFFAF1",
        marginVertical: hp('2.5%'),
        marginLeft: -13,
        borderColor: "#ABDFF6",
        borderWidth: wp('0.5%'),
    },
    applyEffect: {
        flexDirection: "row",
    },
    FlatlistElement_after: {
        marginHorizontal: wp('8%'),
        marginVertical: hp('1%'),
        width: wp('50%'),
        flexDirection: "column",
    },
    FlatlistElement_before: {
        marginHorizontal: wp('8%'),
        marginVertical: hp('4%'),
        width: wp('50%'),
        flexDirection: "column",

    },
    TextStyle_before: {
        color: "#00B1D2FF",
        fontWeight: "bold",
        fontSize: wp('4.5%'),
        fontStyle: "italic"
    },
    TextStyle_after: {
        color: "#00B1D2FF",
        fontWeight: "800",
        fontSize: wp('3.7%'),
        fontStyle: "italic"
    },
    TextStyle_after_for_applyEffect: {
        color: "#00B1D2FF",
        fontWeight: "bold",
        fontSize: wp('4.2%'),
        fontStyle: "italic"
    }
})
