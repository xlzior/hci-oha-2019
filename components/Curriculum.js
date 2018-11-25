import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text, H1, H2, List, ListItem, Left, Right, Icon, View, Input, Form, Item } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

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
    let humanities = [];
    let sciences = [];

    const data = this.props.screenProps["Curriculum"];
    
    //Render each subject from data obtained from firebase
    for(let subject in data){
      let details = data[subject];
      display = (
        <ListItem
          key={details["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'Subject',
            params: { 
              subjectName: details["Name"],
              contact: details["Contact"],
              description: details["Description"]
            }
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

      //Arrange the element under the right section, and
      //render only if searched for (or if searchbar empty)
      if(this.isSearched(details["Name"])){
        if(subject.startsWith("Humanities-")){
          humanities.push(display);
        }else if(subject.startsWith("Sciences-")){
          sciences.push(display);
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
            <Text>Sciences</Text>
          </ListItem>
          {sciences}
          <ListItem itemDivider>
            <Text>Humanities</Text>
          </ListItem>
          {humanities}
        </List>
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
        <View style={{marginBottom: 100}}>
          <H2 style={styles.title}>Contact</H2>
          <Text style={{marginBottom: 15}}>{contact}</Text>
          <H2 style={styles.title}>Description</H2>
          <Text>{description}</Text>
        </View>
      </Content>
    )
  }

  formatParagraph(paragraph) {
    //Double all line spacing
    return paragraph.split('\n').join('\n\n');
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
  Curriculum: {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  Subject: Subject,
});