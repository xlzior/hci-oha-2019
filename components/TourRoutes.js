import React, { Component } from 'react';
import { Content, View, Text, List, ListItem, Left, Right, Icon, Input, Form, Item } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';
import styles from './Style';

class ListView extends Component {
  state = {
    searchTerm: ""
  }

  isSearched(name){
    let search = this.state.searchTerm.toLowerCase();
    //Search bar empty, show all list items
    if(search == "") return true;

    if(name.toLowerCase().includes(search)) return true;
  }

  render() {
    const data = this.props.screenProps["TourRoutes"];
    let tourRoutes = Object.values(data || {})
    
    let display = tourRoutes.map(routeDetails => {
      let { Duration, Name, Route } = routeDetails;
      let showTourRoute = false;
      route = Object.values(Route)
      let locations = route.map(location => {
        // if (this.isSearched(location.Name)) {
          return (
            <ListItem
            key={location.Name}
            >
            <Left><Text>{location.Name}</Text></Left>
            <Right><Icon name="arrow-forward" /></Right>
            </ListItem>
            )
            // showTourRoute = true;
          // }
        })
      let header = (
        <ListItem itemDivider key={Name}>
          <Text>{Name} ({Duration})</Text>
        </ListItem>
      )
      return [header, locations]
      // if (showTourRoute) return [header, locations]
      // else return []
    })

    return (
      <NavigationBar {...this.props}>
      <Form>
        <Item>
          <Input
            onChangeText={searchTerm => {
              this.setState({searchTerm});
            }}
            value={this.state.searchTerm}
            placeholder="Search"
            returnKeyType="search"
            clearButtonMode="always"
          />
        </Item>
      </Form>
        <List>
          {display}
        </List>
      </NavigationBar>
    )
  }
}

export default createStackNavigator({
  "Tour Routes": {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  }
});