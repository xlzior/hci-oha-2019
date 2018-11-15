import React, { Component } from 'react';
import { Text, List, ListItem, Left, Right, Icon, View } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

class ListView extends Component {
  render() {
    let subjects = ['Economics', 'Geography', 'History', 'General Paper', 'Project Work', 'Chinese Language', 'Art', 'Mathematics', 'Science', 'Computing', 'Physical Education', 'Literature in English'];
    let subjectsDisplay = [];
    //Todo: Make categories and format the stuff.
    for(subject in global.data["Curriculum"]){
      letdisplay = 
      <ListItem
        key={subject}
        button onPress={() => this.props.navigation.navigate({
          routeName: 'Subject',
          params: {
            subjectName: global.data["Curriculum"][subject]["Name"], 
            description: global.data["Curriculum"][subject]["Description"],
            contact: global.data["Curriculum"][subject]["Contact"]}
        })}
      >
        <Left>
          <Text>{subject}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>;
      subjectsDisplay.push(letdisplay);
    }

    return (
      <NavigationBar {...this.props}>
        <List>
          <ListItem itemDivider>
            <Text>Subjects Offered</Text>
          </ListItem>
          {subjectsDisplay}
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
    return (
      <View style={{margin:10}}>
        <Text>Contact: {contact}</Text>
        <Text>{subjectName} is a very fun subject which HCI offers.</Text>
      </View>
    )
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