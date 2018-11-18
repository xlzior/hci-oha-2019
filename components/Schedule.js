import React, { Component } from 'react';
import { Text, List, ListItem, Body, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';

export default class Schedule extends Component {
  state = {
    searchTerm: ""
  }
  render() {
    //Dictionary of time to a list of displays of events occuring. 
    //time: [list of displays for events happening in that time]
    //2 months later and I'll come back here and wonder what this is.
    let events = {};
    let timeslots = [];
    const data = this.props.screenProps["Schedule"];

    for(let faq in data){
      let time = data[faq]["Time"];
      let name = data[faq]["Name"];
      let location = data[faq]["Location"];

      //Render the event only if the searchterm is in the name, or if there is no searchTerm.
      //TODO: CURRENTLY BUGGY. COMPONENT RE-RENDERING IS NOT COMPLETELY DONE, 
      //AND SOME NON-RELATED CONTENT IS STILL DISPLAYED REGARDLESS OF SEARCHBOX CONTENT.
      if(name.includes(this.state.searchTerm) || this.state.searchTerm == ""){
        let display = (
          <ListItem
            key={{name} + {time} + {location}}>
            <Body>
              <Text>{name}</Text>
              <Text note>{time} at {location}</Text>
            </Body>
          </ListItem>);
  
        let timeslotevents = [];
  
        //Use an existng list of events if the timeslot is inside events.
        if(time in events){
          timeslotevents = events[time];
          delete events[time];
        }else{
          //Add the timeslot to timeslots if the timeslot isn't inside.
          timeslots.push(time);
        }
        timeslotevents.push(display);
        events[time] = timeslotevents;
      }

    }

    //Sort timeslots (by string)
    timeslots.sort();
    let displaylist = [];
    //Add to displaylist according to sorted format
    for(let index in timeslots){
      time = timeslots[index];
      //Timeslot header
      let listitems = [];
      listitems.push(
      <ListItem itemDivider
        key = {time}>
        <Text>{time}</Text>
      </ListItem>);
      //Add all events associated to the timeslot
      listitems.push(events[time]);

      //Add the final listitems to displaylist
      displaylist.push(listitems);
    }

    return (
      <NavigationBar {...this.props}>
        <Form>
          <Item>
            <Input
              onChangeText={searchTerm => this.setState({searchTerm})}
              value={this.state.searchTerm}
              placeholder="Search"
              returnKeyType="search"
              clearButtonMode="always"
            />
          </Item>
        </Form>
        <List>
          {displaylist}
        </List>
      </NavigationBar>
    )
  }
}