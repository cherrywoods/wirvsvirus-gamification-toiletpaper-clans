import React, { Component } from 'react';
import {View, Text} from 'react-native';
import * as database from '_utilities/database.js'

/// expects a teamId in props
class TeamScoreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        disinfectant: 0,
        toiletpaper: 0
    };
  }

  componentDidMount() {
    // register listeners to scores
    database.registerDisinfectantListener(
        this.props.teamId, 
        (newDisinfectantScore) => {
          this.setState({
              disinfectant: newDisinfectantScore,
              toiletpaper: this.state.toiletpaper,
          });
    });

    database.registerToiletpaperListener(
        this.props.teamId,
        (newToiletpaperScore) => {
          this.setState({
              disinfectant: this.state.disinfectant,
              toiletpaper: newToiletpaperScore
          });
    });
  }

  render() {
        return (
            <View>
                <Text >
                    disinfectant: {this.state.disinfectant}
                </Text>
                <Text>
                    toiletpaper: {this.state.toiletpaper}
                </Text>
            </View>
        );
  }
}

export default TeamScoreView