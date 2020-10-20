import React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import Filters from './Filters'
import Slider from '@react-native-community/slider'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class AvailableFiltersStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pencil_shade_value :0.01,
            tap: true,
        }

    }
    componentDidMount() {

    }
    change(value){
        this.setState(() => {
          return {
            pencil_shade_value: parseFloat(value)
          };
        });
      }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style ={styles.container_effect}
                    onPress={
                        () => {
                            this.props.navigation.navigate('Filters', {
                                effect: 'watercolour'
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
                    onPress={() => {
                        this.props.navigation.navigate('Filters', {
                            effect: 'oilpaint'
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
                    onPress={() => {
                        this.setState({
                            tap: true
                        })
                        this.props.navigation.navigate('Filters',{
                            effect:'pencilsketchBW'
                        })
                    }}
                >
                    <View>
                        {this.state.tap === false ?
                            <Text>
                                Pencil Sketch B/W
                            </Text>
                            :
                            <View>
                                <Text>
                                    Pencil Sketch B/W
                                </Text>
                                <Text>{this.state.pencil_shade_value}</Text>
                                <Slider
                                    step={0.01}
                                    maximumValue={0.1}
                                    onValueChange={this.change.bind(this)}
                                    value={this.state.pencil_shade_value}
                                />
                            </View>
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Filters', {
                            effect: 'pencilsketchColor'
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:wp('3%'),
        marginVertical:hp('3%')
    },
    container_effect:{
        marginVertical:hp('5%'),
    }

})
