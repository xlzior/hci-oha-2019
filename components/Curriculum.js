import React, { Component } from 'react';
import { Content, Text, H3, List, ListItem, Left, Right, Icon, View, Input, Form, Item } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import Hyperlink from 'react-native-hyperlink';

import NavigationBar from './NavigationBar';
import styles from './Style';

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
    let subjects = {}
    const data = this.props.screenProps.data["Curriculum"];
    
    // Render each subject from data obtained from firebase
    for(let subject in data){
      let category = subject.split('-')[0]
      let {Name, Contact, Description} = data[subject]
      let subjectDisplay = (
        <ListItem
          key={Name}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'Subject',
            params: { 
              subjectName: Name,
              contact: Contact,
              description: Description
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
        if (subjects.hasOwnProperty(category)) {
          subjects[category].push(subjectDisplay)
        } else {
          subjects[category] = [subjectDisplay]
        }
      }
    }

    let listDisplay = []
    for (let categoryName in subjects) {
      if (subjects[categoryName].length > 0) {
        listDisplay.push(
          <ListItem itemDivider key={categoryName}>
            <Text>{categoryName}</Text>
          </ListItem>
        )
        listDisplay.push(...subjects[categoryName])
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

class Subject extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('subjectName', 'Subject Name'),
      contact: navigation.getParam('contact', 'wangdk@hci.edu.sg'),
      description: navigation.getParam('description', 'fun subject worth taking'),
    };
  };

  render() {
    const {getParam} = this.props.navigation;
    let subjectName = getParam('subjectName', 'Subject Name');
    let contact = getParam('contact', 'wangdk@hci.edu.sg');
    let description = getParam('description', 'fun subject worth taking');
    description = this.formatParagraph(description);
    return (
      <Content style={{padding:20}}>
        <View style={{marginBottom: 20}}>
          <H3 style={styles.h3HeaderText}>Description</H3>
          <Hyperlink linkDefault linkStyle={styles.link}>
            <Text>{description}</Text>
          </Hyperlink>
        </View>
        <View style={{marginBottom: 100}}>
          <H3 style={styles.h3HeaderText}>Contact</H3>
          <Hyperlink linkDefault linkStyle={styles.link}>
            <Text style={{marginBottom: 15}}>{contact}</Text>
          </Hyperlink>
        </View>
      </Content>
    )
  }

  formatParagraph(paragraph) {
    //Double all line spacing
    return paragraph.split('\n').join('\n\n');
  }
}


export default createStackNavigator({
  Curriculum: {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  Subject: Subject,
});