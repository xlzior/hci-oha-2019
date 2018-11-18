import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Content, View, Text, H1, H2, List, ListItem, Left, Right, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

class ListView extends Component {
  render() {
    let sportsccas = [];
    let clubs = [];
    let vnas = [];
    let councils = [];
    const data = this.props.screenProps;
    for(let cca in data["CCA"]){
      display = (
        <ListItem
          key={data["CCA"][cca]["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'CCAType',
            params: { ccaName: data["CCA"][cca]["Name"],
            boothLocation: data["CCA"][cca]["BoothLocation"],
            description: data["CCA"][cca]["Description"],
            photo: data["CCA"][cca]["Photo"] }
          })}
        >
          <Left>
            <Text>{data["CCA"][cca]["Name"]}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );

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
    
    return (
      <NavigationBar {...this.props}>
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
      description: navigation.getParam('description', 'A cca that exists somewhere'),
      boothlocation: navigation.getParam('boothLocation', 'Somewhere over the rainbow'),
      photo: navigation.getParam('photo', 'fOto')
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
      image = <Image
        style={{flex:1, height:150, marginBottom:10}}
        source={{uri: photo}}
      />
    }

    return (
      <Content style={{padding:20}}>
        <View style={{marginBottom: 100}}>
          {image}
          <H2 style={styles.title}>Booth Location</H2>
          <Text style={{marginBottom: 15}}>{boothLocation}</Text>
          <H2 style={styles.title}>Description</H2>
          <Text>{description}</Text>
        </View>
      </Content>
    );
    
  }
  
  formatParagraph(paragraph) {
    //Replace all \\ns with \n, undo (possibly poor) manual double line spacing
    // and double all line spacing.
    return paragraph.split('\\\\n').join('\n')
    .split('\n\n').join('\n')
    .split('\n').join('\n\n');
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    marginTop: 20,
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