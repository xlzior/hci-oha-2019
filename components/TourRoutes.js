import React, { Component } from 'react';
import { Switch } from 'react-native'
import { Text, List, ListItem, Left, Right, Icon, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';
import styles from './Style';

export default class TourRoutes extends Component {
  state = {
    searchTerm: "",
    isWetWeather: false
  }

  isSearched(name){
    let search = this.state.searchTerm.toLowerCase();
    //Search bar empty, show all list items
    if(search == "") return true;

    if(name.toLowerCase().includes(search)) return true;
  }

  render() {
    let tourRoutes = Object.values(this.props.screenProps["TourRoutes"] || {})
    
    let display = tourRoutes.map(routeDetails => {
      let { Duration, Name, Route } = routeDetails;
      let route = Object.values(Route)
      let showTourRoute = false
      if (this.state.searchTerm == "") showTourRoute = true
      
      let locations = route.map(location => {
        if (this.isSearched(location)) {
          showTourRoute = true;
          return (
            <ListItem
              key={location}
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: 'Map',
                  params: { markers: route, highlighted: location }
                })
              }}
            >
              <Left><Text>{location}</Text></Left>
              <Right><Icon name="arrow-forward" /></Right>
            </ListItem>
          )
        }
      })
        
      let header = (
        <ListItem itemDivider key={Name}>
          <Text>{Name} ({Duration})</Text>
        </ListItem>
      )
      let routeIsWet = Name.indexOf("Wet") != -1
      if (showTourRoute && routeIsWet == this.state.isWetWeather) return [header, locations]
      else return []
    })

    return (
      <NavigationBar {...this.props}>
      <Form>
        <Item>
          <Input
            onChangeText={searchTerm => {this.setState({searchTerm})}}
            value={this.state.searchTerm}
            placeholder="Search"
            returnKeyType="search"
            clearButtonMode="always"
          />
        </Item>
      </Form>
        <List>
          <ListItem>
            <Left><Text>Wet weather routes</Text></Left>
            <Right>
              <Switch
                value={this.state.isWetWeather}
                onValueChange={isWetWeather => {this.setState({isWetWeather})}}
              />
            </Right>
          </ListItem>
          {display}
        </List>
      </NavigationBar>
    )
  }
}