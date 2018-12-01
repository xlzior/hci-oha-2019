import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Content, View, Text, H2, List, ListItem, Left, Right, Icon, Input, Form, Item } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import Hyperlink from 'react-native-hyperlink';

import NavigationBar from './NavigationBar';
import styles from './Style';
import FullWidthImage from './FullWidthImage';

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
    let routes = {};
    for (let location in data) {
      let details = data[location];
      let route = location.split("-")[0];
      if (!routes.hasOwnProperty(route)) routes[route] = [];

      let display = (
        <ListItem
          key={details["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'Location',
            params: { locationName: details["Name"],
            description: details["Description"],
            photo: details["Photo"] }
          })}
        >
          <Left>
            <Text>{details["Name"]}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );

      if(this.isSearched(details["Name"])){
        routes[route].push(display)
      }
    }
    let listDisplay = [];
    for (let route in routes) {

      listDisplay.push(
        <ListItem itemDivider key={route}>
          <Text>{route}</Text>
        </ListItem>
      )
      listDisplay.push(routes[route])
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
          {listDisplay}
        </List>
      </NavigationBar>
    )
  }
}


class Location extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('locationName', 'Location Name'),
      description: navigation.getParam('description', 'a location in Hwa Chong'),
      photo: navigation.getParam('photo', 'fOto')
    };
  };

  render() {
    const {getParam} = this.props.navigation;
    let locationName = getParam('locationName', 'Location Name');
    let description = getParam('description', 'a location in Hwa Chong');
    description = this.formatParagraph(description);
    let photo = getParam('photo', 'fOto');
    let image;
    if(photo != 'none'){
      image = <FullWidthImage
        style={styles.contentImage}
        source={{uri: photo}}
      />
    }

    return (
      <Content style={{padding:20}}>
        <View style={{marginBottom: 100}}>
          {image}
          <H2 style={styles.title}>Description</H2>
          <Hyperlink linkDefault = {true} linkStyle = {styles.link}>
            <Text>{description}</Text>
          </Hyperlink>
        </View>
      </Content>
    );
    
  }
  
  formatParagraph(paragraph) {
    //Double all line spacing
    return paragraph.split('\n').join('\n\n');
  }
}

export default createStackNavigator({
  "Tour Routes": {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  Location: Location,
});

// old geolocation stuffs
/*
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
    return (
      <NavigationBar {...this.props}>
      </NavigationBar>
    )
  }
}
/* */