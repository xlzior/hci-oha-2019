import React, { Component } from 'react';
import { Text, View } from 'native-base';
import MapView, { Marker, Overlay } from 'react-native-maps';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

import NavigationBar from './NavigationBar';

export default class MapViewContainer extends Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <MapView
          style={{flex: 1, height: height-50}}
          initialRegion={{
            latitude: 1.325307, 
            longitude: 103.806137,
            latitudeDelta: 0.00005,
            longitudeDelta: 0.006327
          }}
          showsUserLocation={true}
        >
        <Overlay
          image={require('./../images/oha_map.png')}
          bounds={[[1.326952, 103.804467], [1.323702, 103.808029]]}
        />
        </MapView>
      </NavigationBar>
    )
  }
}

// bounds={[[1.326952, 103.804467], [1.323702, 103.808029]]}