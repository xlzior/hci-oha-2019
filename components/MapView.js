import React, { Component } from 'react';
import MapView, { Marker, Overlay } from 'react-native-maps';
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');

import NavigationBar from './NavigationBar';

export default class MapViewContainer extends Component {
  render() {
    let markersRaw = this.props.navigation.getParam('markers') || []
    let highlighted = this.props.navigation.getParam('highlighted') || {}
    let markers = markersRaw.map((location) => {
      let {Name, Latitude, Longitude} = location
      let shouldBeHighlighted = JSON.stringify(location) == JSON.stringify(highlighted)
      return (<Marker
        key={Name}
        coordinate={{
          latitude: Latitude,
          longitude: Longitude
        }}
        pinColor={shouldBeHighlighted ? 'blue' : 'red'}
        title={Name}
      />)
    })
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
          bounds={[[1.327320, 103.804719], [1.324026, 103.808213]]}
        />
        {markers}
        </MapView>
      </NavigationBar>
    )
  }
}