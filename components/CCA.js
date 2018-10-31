import React, { Component } from 'react';
import { Text, List, ListItem, Left, Right, Icon, View } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

class ListView extends Component {
  render() {
    let sportsCCAs = ['Badminton', 'Basketball', 'Canoeing', 'Cross Country', 'Fencing', 'Floorall', 'Golf', 'Judo'];
    let sportsDisplay = sportsCCAs.map(cca => (
      <ListItem
        key={cca}
        button onPress={() => this.props.navigation.navigate({
          routeName: 'CCAType',
          params: {ccaName: cca}
        })}
      >
        <Left>
          <Text>{cca}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
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


class CCAType extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('ccaName', 'CCA Name'),
    };
  };

  render() {
    const {getParam} = this.props.navigation;
    let ccaName = getParam('ccaName', 'CCA Name');
    return (
      <View style={{margin:10}}>
        <Text>{ccaName} is a cca.</Text>
      </View>
    )
  }
}

export default createStackNavigator({
  CCA: {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  CCAType: CCAType,
});