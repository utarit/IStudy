import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'unstated';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider><AppNavigator /></Provider>
          
        </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
