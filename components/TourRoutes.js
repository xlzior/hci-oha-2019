import React, { Component } from 'react';
import { Text } from 'native-base';

import NavigationBar from './NavigationBar';

export default class TourRoutes extends Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <Text>Tour Routes</Text>
      </NavigationBar>
    )
  }
}