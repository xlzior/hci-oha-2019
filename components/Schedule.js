import React, { Component } from 'react';
import { Text, List, ListItem, Body, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';

export default class Schedule extends Component {
  state = {
    searchTerm: ""
  }

  isSearched(name,location,time){
    let search = this.state.searchTerm.toLowerCase();
    if(search == "")
      return true;
    if(name.toLowerCase().includes(search)||
    location.toLowerCase().includes(search)||
    String(time).includes(search))
      return true;
  }

  render() {
    let academic = [];
    let performances = [];
    const data = this.props.screenProps["Schedule"];

    for(let event in data){
      let time = data[event]["Time"];
      let name = data[event]["Name"];
      let location = data[event]["Location"];
      let display = (
        <ListItem
          key={event}>
          <Body>
            <Text>{name}</Text>
            <Text note>{time} at {location}</Text>
          </Body>
        </ListItem>
      );
      if(this.isSearched(name,location,time)){
        if(event.startsWith("Performance-")){
          performances.push(display);
        }else{
          academic.push(display);
        }
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
        <List>
          <ListItem itemDivider>
            <Text>Performances</Text>
          </ListItem>
          {performances}
          <ListItem itemDivider>
            <Text>Academic Talks</Text>
          </ListItem>
          {academic}
        </List>
      </NavigationBar>
    )
  }
}