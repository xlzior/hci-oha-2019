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
            latitude: 1.327139, 
            longitude: 103.804468,
            latitudeDelta: 0.021,
            longitudeDelta: 0.008
          }}
          showsUserLocation={true}
        >
        <Overlay
          image={{uri: "https://static.wixstatic.com/media/89ebb0_69ec8ee9e22d477aaadfcf8a8c6ab779~mv2_d_4266_3200_s_4_2.png"}}
          bounds={[[1.329238,103.800667], [1.323872, 103.806640]]}
        />
        </MapView>
      </NavigationBar>
    )
  }
}

// bounds={[[1.329238,103.800667], [1.323872, 103.806640]]}