import React from 'react'
import {Animated, StyleSheet, Text} from 'react-native'


export default class QuoteView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  
    componentDidMount() {
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 3000,              // Make it take a while
        }
      ).start();                        // Starts the animation
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 // Special animatable View
          style={{
            ...this.props.style,
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          <Text style={styles.quoteText}>{this.props.quote}</Text>
        </Animated.View>
      );
    }
  }

  const styles = StyleSheet.create({
    quoteText: {
        fontSize: 15,
    }
  })