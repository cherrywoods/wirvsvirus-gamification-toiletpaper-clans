import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ProgressBar extends Component {

  constructor(props) {
    super(props);
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
      <View style={styles.container}>
        <View style={styles.durationContainer}>
          <Icon name="timer" size={15} color="black" style={styles.icon} />
          <Text style={styles.timer}>{ this.props.duration }</Text>
        </View>
        <View style={[styles.barContainer, row && styles.row, { height }]}>
          <View style={[styles.row, { borderColor, borderWidth, borderRadius }]}>
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
            />
            <Animated.View
              style={[
                styles.bar,
                {
                  width: widthInterpolated,
                  backgroundColor: barColor,
                  borderRadius: borderRadius,
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
  },
  row: {
    flex: 1,
  },
  timer: {
    position: 'absolute',
    left: 30,
    zIndex: 1,
    fontFamily: 'Carista',
    fontSize: 22,
  },
  bar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
});

ProgressBar.defaultProps = {
  height: 20,
  borderColor: '#FFFFFF',
  borderWidth: 2,
  borderRadius: 4,
  barColor: '#aec8c3',
  fillColor: 'white',
  duration: 100,
};

export default ProgressBar;
