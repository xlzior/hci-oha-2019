import React, { Component } from 'react';
import { Text } from 'native-base';

import NavigationBar from './NavigationBar';

export default class MapView extends Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <Text>Map</Text>
        <Text>己立立人，己达达人</Text>
      </NavigationBar>
    )
  }
}