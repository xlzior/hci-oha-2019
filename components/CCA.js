import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Content, View, Text, H1, H2, List, ListItem, Left, Right, Icon, Input, Form, Item } from 'native-base';
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
    //Search bar empty
    if(search == "")
      return true;

    if(name.toLowerCase().includes(search))
      return true;
  }

  render() {
    let sportsccas = [];
    let clubs = [];
    let vnas = [];
    let councils = [];

    const data = this.props.screenProps["CCA"];

    //Render all the cca elements from the data fetched from firebase
    for(let cca in data){
      let details = data[cca];
      display = (
        <ListItem
          key={details["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'CCAType',
            params: { ccaName: details["Name"],
            boothLocation: details["BoothLocation"],
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

      //Push the element under the right section, and display it only
      //when searched for (or when searchbar is empty)
      if(this.isSearched(details["Name"])){
        if (cca.startsWith("Sports-")){
          sportsccas.push(display);
        } else if(cca.startsWith("Club-")){
          clubs.push(display);
        } else if(cca.startsWith("VNA-")){
          vnas.push(display);
        } else if(cca.startsWith("Council-")){
          councils.push(display);
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
            <Text>Councils</Text>
          </ListItem>
          {councils}
          <ListItem itemDivider>
            <Text>Sports CCAs</Text>
          </ListItem>
          {sportsccas}
          <ListItem itemDivider>
            <Text>Visual and Performing Arts</Text>
          </ListItem>
          {vnas}
          <ListItem itemDivider>
            <Text>Clubs and Societies</Text>
          </ListItem>
          {clubs}
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
    let description = getParam('description', 'A cca that exists somewhere');
    description = this.formatParagraph(description);
    let boothLocation = getParam('boothLocation', 'Somewhere over the rainbow');
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
          <H2 style={styles.title}>{ccaName}</H2>
          {image}
          <H2 style={styles.title}>Booth Location</H2>
          <Text style={{marginBottom: 15}}>{boothLocation}</Text>
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
  CCA: {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  CCAType: CCAType,
});