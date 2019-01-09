import React, { Component } from 'react';
import MapView, { Marker, Overlay } from 'react-native-maps';
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');

import NavigationBar from './NavigationBar';

export default class MapViewContainer extends Component {
  async componentDidMount() {
    const { Location, Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('Location permission not granted');
    }
  }
  render() {
    const {Locations} = this.props.screenProps.data
    let markersRaw = this.props.navigation.getParam('markers') || []
    let highlighted = this.props.navigation.getParam('highlighted') || ""

    let markers = markersRaw.map((marker) => {
      const {Latitude, Longitude} = Locations[marker]
      return (<Marker
        key={marker}
        coordinate={{
          latitude: Latitude,
          longitude: Longitude
        }}
        pinColor={marker == highlighted ? 'blue' : 'red'}
        title={marker}
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