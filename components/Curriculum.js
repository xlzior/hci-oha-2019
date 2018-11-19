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
    const data = this.props.screenProps;
    //Todo: Make categories and format the stuff.
    for(let subject in data["Curriculum"]){
      display = (
        <ListItem
          key={data["Curriculum"][subject]["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'Subject',
            params: { 
              subjectName: data["Curriculum"][subject]["Name"],
              contact: data["Curriculum"][subject]["Contact"],
              description: data["Curriculum"][subject]["Description"]
            }
          })}
        >
          <Left>
            <Text>{data["Curriculum"][subject]["Name"]}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
      if(this.isSearched(data["Curriculum"][subject]["Name"])){
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
    //Replace all \\ns with \n, undo (possibly poor) manual double line spacing
    // and double all line spacing.
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