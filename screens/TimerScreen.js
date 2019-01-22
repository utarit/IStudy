import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import QuoteView from '../components/QuoteView';

let timer;
const quotes = [
    'JUST DO IT!',
    'Your friends are not dying!',
    'Stay away your Whatsapp. Nobody is having a party',
    'Do not think the big picture. Focus on small goals.',
    'When you finish this, you may look up the news.',
    'Why are you looking your phone ???'
]

export default class TimerScreen extends React.Component {

    static navigationOptions = {
        title: 'Timer',
    };

    constructor(props) {
        super(props)
        this.state = {
            minutes: 25, //THIS IS GONNA CHANGE
            seconds: 0,
            clockIsOn: false,
            quote: "Let's start!"
        }
    }

    incrementMin = () => {
        this.setState((state) => {
            if (state.minutes < 120) {
                return { minutes: state.minutes + 5 }
            } else {
                return state
            }

        })
    }


    decrementMin = () => {
        this.setState((state) => {
            if (state.minutes > 5) {
                return { minutes: state.minutes - 5 }
            } else {
                return state
            }
        })
    }

    startClock = () => {
        this.setState({ clockIsOn: true })
        timer = setInterval(() => {
            this.setState((state) => {
                if (state.minutes == 0 && state.seconds == 0) {
                    clearInterval(timer)
                    return { clockIsOn: false }
                } else if (state.seconds == 0) {
                    if (state.minutes % 2 == 0) {
                        let index = Math.floor(Math.random() * quotes.length)
                        return { minutes: state.minutes - 1, seconds: 59, quote: quotes[index] }
                    }
                    return { minutes: state.minutes - 1, seconds: 59 }
                } else {
                    return { seconds: state.seconds - 1 }
                }
            })
        }, 1000)
    }

    formatNumber = (d) => {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() {

        return (
            <View style={styles.outerContainer}>
                <View style={styles.upperContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.timer}>{`${this.formatNumber(this.state.minutes)}:${this.formatNumber(this.state.seconds)}`}</Text>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    {this.state.clockIsOn ?
                        <QuoteView key={this.state.quote} style={styles.quotesContainer} quote={this.state.quote} /> :
                        <View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={this.decrementMin} ><Ionicons name="md-remove-circle" size={40} color="red" /></TouchableOpacity>
                                <Text style={{ fontSize: 20 }}>  5 min  </Text>
                                <TouchableOpacity onPress={this.incrementMin}><Ionicons name="md-add-circle" size={40} color="green" /></TouchableOpacity>
                            </View>
                            <View style={styles.startButtonContainer}>
                                <Button light style={{paddingHorizontal: 22}} onPress={this.startClock}><Text style={{fontSize:18}}> START </Text></Button>
                            </View>
                        </View>}
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    circle: {
        height: Dimensions.get('window').width * 0.5,
        width: Dimensions.get('window').width * 0.5,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        borderColor: '#000',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 40,

    },
    upperContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        flex: 3,
        //borderWidth: 1
    },
    lowerContainer: {
        flex: 2,
        //borderWidth: 1,
        paddingTop: 10
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        paddingBottom: 40,
        //borderWidth: 1,
    },
    startButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        //borderWidth: 1,
        justifyContent: 'center'

    },
    quotesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        paddingTop: 50,
        paddingHorizontal: 15,
    }
});
