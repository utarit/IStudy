import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import AppContainer from './navigation/AppContainer';
import {Provider, Subscribe} from 'unstated';
import StateContainer from './state/StateContainer';

export default class App extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider>
            <Subscribe to={[StateContainer]}>
              {data => (
                <AppContainer data={data} />
              )}
            </Subscribe>
          </Provider>
          
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
