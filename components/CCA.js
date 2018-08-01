import React, { Component } from 'react';
import { Text, List, ListItem } from 'native-base';

import NavigationBar from './NavigationBar';

export default class CCA extends Component {
  render() {
    let sportsCCAs = ['Badminton', 'Basketball', 'Canoeing', 'Cross Country', 'Fencing', 'Floorall', 'Golf', 'Judo'];
    let sportsDisplay = sportsCCAs.map(e => (
      <ListItem key={e}>
        <Text>{e}</Text>
      </ListItem>
    ))
    return (
      <NavigationBar {...this.props}>
        <List>
          <ListItem itemDivider>
            <Text>Sports CCAs</Text>
          </ListItem>
          {sportsDisplay}
        </List>
      </NavigationBar>
    )
  }
}