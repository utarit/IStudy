import React from 'react';
import {Text, StyleSheet, View} from 'react-native';



export default class StudyGroupScreen extends React.Component {
    static navigationOptions = {
        title: 'Study Group',
    };

    render(){

        return(
            <View style={styles.outerView}>
                <Text>This screen will be implemented.</Text>
            </View>
            
        )
    }
} 

const styles = StyleSheet.create({
    outerView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})