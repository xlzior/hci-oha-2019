import React, { Component } from 'react'
import { Text, View, Button } from 'native-base'
import Moment from "react-moment"
import NavigationBar from './NavigationBar'
import styles from './Style';

export default class AboutTheApp extends Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <View style={{padding: 15}}>
          <Text style={{marginBottom: 20}}>This app was created by students from the Hwa Chong Infocomm and Robotics Society in conjunction with the Students' Council.</Text>
          <Text>App glitching or data outdated?</Text>
          <Text>Download the data again:</Text>
          <Button
            onPress={() => this.props.screenProps.downloadData()}
          ><Text>Download data</Text></Button>
          <Text>Last updated: <Moment element={Text} fromNow>{this.props.screenProps.data.lastUpdate}</Moment></Text>
        </View>
      </NavigationBar>
    )
  }
}