import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet

} from 'react-native';

import { Subscribe } from 'unstated';
import StateContainer from '../state/StateContainer';

// const profile = {
//     username: "utarit",
//     points: 140,
//     studyGroup: 'CengoTayfa',
//     studyHistory: {}
// }

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };



    studyList = (history) => {
        const hist = Object.entries(history)
        return hist.map((entry) => (
            <Text key={entry[0]}>{entry[0]}: {entry[1]}</Text>
        ))
        
    }

    render() {

        return (

            <Subscribe to={[StateContainer]}>
                {
                    (profile) => {
                        console.log(profile)
                        return (
                            <View>
                                <View style={styles.outerContainer}>
                                    <View>
                                        <Image source={require("../assets/robot.png")} />
                                    </View>
                                    <View>
                                        <Text><Text style={styles.headerText}>Name: </Text>{profile.state.username}</Text>
                                        <Text><Text style={styles.headerText}>Study Group: </Text> {profile.state.studyGroup}</Text>
                                        <Text><Text style={styles.headerText}>Points: </Text>{profile.state.points}</Text>
                                    </View>
                                </View>
                                <View>
                                    {this.studyList(profile.state.studyHistory)}
                                </View>
                            </View>


                        )
                    }
                }
            </Subscribe>
        )
    }
}


const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
    },
    headerText: {
        fontWeight: 'bold'
    }
})