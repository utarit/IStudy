import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet

} from 'react-native';

import { Subscribe } from 'unstated';
import ProfileContainer from '../state/ProfileContainer';

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

    render() {

        // const date = new Date(Date.now());
        // profile.studyHistory[date.toDateString()] = 150
        // console.log(profile.studyHistory)

        return (

            <Subscribe to={[ProfileContainer]}>
                {
                    (profile) => {
                        console.log(profile)
                        return (
                            <View style={styles.outerContainer}>
                                <View>
                                    <Image source={profile.state.profile_pic} />
                                </View>
                                <View>
                                    <Text><Text style={styles.headerText}>Name: </Text>{profile.state.username}</Text>
                                    <Text><Text style={styles.headerText}>Study Group: </Text> {profile.state.studyGroup}</Text>
                                    <Text><Text style={styles.headerText}>Points: </Text>{profile.state.points}</Text>
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