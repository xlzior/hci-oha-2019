import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Content, View, Text, H2, List, ListItem, Left, Right, Icon, Input, Form, Item, Button } from 'native-base';
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
    if(search == "") return true; // Search bar empty
    if(name.toLowerCase().includes(search)) return true;
  }

  render() {
    let CCAs = {}
    const data = this.props.screenProps.data["CCA"];

    // Render each CCA from data obtained from firebase
    for(let cca in data){
      let category = cca.split('-')[0]
      let {Name} = data[cca];
      let ccaDisplay = (
        <ListItem
          key={Name}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'CCADetails',
            params: {
              ccaName: Name,
              details: data[cca]
            }
          })}
        >
          <Left>
            <Text>{Name}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );

      //Push the element under the right section, and display it only when searched for (or when searchbar is empty)
      if(this.isSearched(Name)){
        if (CCAs.hasOwnProperty(category)) {
          CCAs[category].push(ccaDisplay)
        } else {
          CCAs[category] = [ccaDisplay]
        }
      }
    }

    let listDisplay = []
    for (let categoryName in CCAs) {
      if (CCAs[categoryName].length > 0) {
        listDisplay.push(
          <ListItem itemDivider key={categoryName}>
            <Text>{categoryName}</Text>
          </ListItem>
        )
        listDisplay.push(...CCAs[categoryName])
      }
    }

    return (
      <NavigationBar {...this.props}>
        <Form><Item>
          <Input
            onChangeText={searchTerm => {
              this.setState({searchTerm});
            }}
            value={this.state.searchTerm}
            placeholder="Search"
            returnKeyType="search"
            clearButtonMode="always"
          />
        </Item></Form>
        <List>{listDisplay}</List>
      </NavigationBar>
    )
  }
}


class CCADetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('ccaName', 'CCA Name'),
    };
  };

  render() {
    const {getParam} = this.props.navigation;
    let details = getParam('details');
    let {Name, BoothLocation, Description, Photo, Photo2, Website} = details
    Description = this.formatParagraph(Description);
    let image, image2;
    if(Photo){
      image = (<FullWidthImage
        style={styles.contentImage}
        source={{uri: Photo}}
      />)
    }
    if(Photo2){
      image2 = (<FullWidthImage
        style={styles.contentImage}
        source={{uri: Photo2}}
      />)
    }

    return (
      <Content style={{padding:20}}>
        <View style={{marginBottom: 100}}>
          <H2 style={styles.title}>{Name}</H2>
          {image}
          {image2}
          <Text style={styles.margins}>
            <Text style={{fontWeight: 'bold'}}>Booth Location: </Text>
            {BoothLocation}
          </Text>
          <Button
            style={styles.margins}
            onPress={() => this.props.navigation.navigate({
              'routeName': 'Map',
              'params': { markers: [BoothLocation], highlighted: null }
            })}>
            <Text>Go to map</Text>
          </Button>

          <Hyperlink linkDefault linkStyle={styles.link}>
            <Text style={styles.margins}>{Description}</Text>
          </Hyperlink>
          <Button
            style={styles.margins}
            onPress={() => Linking.openURL(Website)}
          >
            <Text>Visit CCA website</Text>
          </Button>
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
  CCADetails: CCADetails,
});