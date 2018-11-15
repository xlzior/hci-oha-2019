import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, View } from 'react-native';
import { Text, List, ListItem, Left, Right, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

class ListView extends Component {
  render() {
    let listitems = [];
    for(let sport in global.data["CCA"]){
      display = 
        <ListItem
          key={global.data["CCA"][sport]["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'CCAType',
            params: { ccaName: global.data["CCA"][sport]["Name"],
            boothLocation: global.data["CCA"][sport]["BoothLocation"],
            description: global.data["CCA"][sport]["Description"],
            photo: global.data["CCA"][sport]["Photo"] }
          })}
        >
          <Left>
            <Text>{global.data["CCA"][sport]["Name"]}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>;
        listitems.push(display);
    }
   
    
    return (
      <NavigationBar {...this.props}>
        <List>
          <ListItem itemDivider>
            <Text>Sports CCAs</Text>
          </ListItem>
          {listitems}
        </List>
      </NavigationBar>
    )
  }
}


class CCAType extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('ccaName', 'CCA Name'),
      description: navigation.getParam('description', 'A cca that exists somewhere'),
      boothlocation: navigation.getParam('boothLocation', 'Somewhere over the rainbow'),
      photo: navigation.getParam('photo', 'fOto')
    };
  };

  render() {
    const {getParam} = this.props.navigation;
    let ccaName = getParam('ccaName', 'CCA Name');
    let description = getParam('description', 'A cca that exists somewhere');
    let boothLocation = getParam('boothLocation', 'Somewhere over the rainbow');
    let photo = getParam('photo', 'fOto');
    description = description.split("     ");
    paragraphs = [];
    for(let index in description){
      paragraphs.push(<Text style={{marginBottom:20}}>{description[index]}</Text>);
    }
    return (
      <ScrollView style={{padding:20}}>
        <View style={{marginBottom: 100}}>
          <Image
            style={{flex:1, height:150, marginBottom:10}}
            source={{uri: photo}}
          />
          <Text style={styles.title}>Booth Location:</Text>
          <Text>{boothLocation}</Text>
          <Text style={styles.title}>Description:</Text>
          {paragraphs}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold'
  }
})

export default createStackNavigator({
  CCA: {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  CCAType: CCAType,
});