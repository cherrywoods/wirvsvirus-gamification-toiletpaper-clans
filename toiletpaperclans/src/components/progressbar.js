import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated } from 'react-native';

class ProgressBar extends Component {

  constructor(props) {
    super(props)
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration,
      }).start();
    }
  }


  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor,
      row,
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });

    return (
      <View style={[{flexDirection: 'row', height }, row ? { flex: 1} : undefined ]}>
        <View style={{ flex: 1, borderColor, borderWidth, borderRadius}}>
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor,
              borderRadius: borderRadius,
            }}
          />
        </View>
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  height: 10,
  borderColor: '#FFFFFF',
  borderWidth: 2,
  borderRadius: 4,
  barColor: '#aec8c3',
  fillColor: 'white',
  duration: 100,
};

export default ProgressBar;
