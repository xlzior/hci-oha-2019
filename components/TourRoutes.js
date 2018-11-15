import React, { Component } from 'react';
import { Text } from 'native-base';

import NavigationBar from './NavigationBar';

export default class TourRoutes extends Component {
  state = {
    latitude: -1,
    longitude: -1
  }

  componentWillUnmount = () => {
    this.mounted = false;
  };

  updateLocation(){
    this.mounted = true;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(
    ({coords}) => {
      if(this.mounted){
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      }
    },
    () => console.error(`ERROR(${err.code}): ${err.message}`),
    options);
  }
  render() {
    this.updateLocation();
    return (
      <NavigationBar {...this.props}>
        <Text>Tour Routes</Text>
        <Text> Geolocation running </Text>
        <Text>Latitude: {this.state.latitude}; Longitude: {this.state.longitude}</Text>
      </NavigationBar>
    )
  }
}