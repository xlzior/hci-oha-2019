import React, { Component } from 'react';
import { Text, List, ListItem, Body, Input, Form, Item, Right, Icon } from 'native-base';

import NavigationBar from './NavigationBar';

export default class Schedule extends Component {
  state = {
    searchTerm: ""
  }

  //Different from the others.
  //Also searches based on individual details like
  //location, name and time.
  isSearched(name,location,time){
    let search = this.state.searchTerm.toLowerCase();
    
    if(search == "") return true; // Search bar empty

    //Search for individual details
    if(name.toLowerCase().includes(search)||
    location.toLowerCase().includes(search)||
    String(time).includes(search))
      return true;
  }

  render() {
    let schedule = {}

    const data = this.props.screenProps.data["Schedule"];
    //Render every event present in firebase data
    for(let event in data){
      let category = event.split('-')[0]
      let {Name, Time, Location} = data[event]
      let eventDisplay = (
        <ListItem
          key={event}
          onPress={() => this.props.navigation.navigate({
            'routeName': 'Map',
            'params': { markers: [Location], highlighted: null }
          })}
        >
          <Body>
            <Text>{Name}</Text>
            <Text note>{Time} at {Location}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );

      //Push the element under the right section, and display it only when searched for (or when searchbar is empty)
      if(this.isSearched(Name, Location, Time)){
        if (schedule.hasOwnProperty(category)) {
          schedule[category].push(eventDisplay)
        } else {
          schedule[category] = [eventDisplay]
        }
      }
    }

    let listDisplay = []
    for (let categoryName in schedule) {
      if (schedule[categoryName].length > 0) {
        listDisplay.push(
          <ListItem itemDivider key={categoryName}>
            <Text>{categoryName}</Text>
          </ListItem>
        )
        listDisplay.push(...schedule[categoryName])
      }
    }

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
        <List>{listDisplay}</List>
      </NavigationBar>
    )
  }
}