import React from 'react';
import {StyleSheet, Platform, View } from 'react-native';
import AppNavigator from './AppNavigator';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        //console.log(this.props)
    }


    componentDidMount(){
        console.log("GETTING LOCAL DATA MAN!")
        this.props.data._retrieveData()
    }

  render() {
    return (
            <AppNavigator key={this.props.data} />    
    );
  }
}

