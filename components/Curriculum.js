import React, { Component } from 'react';
import { Text, List, ListItem, Left, Right, Icon, View } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

class ListView extends Component {
  render() {
    let subjects = ['Economics', 'Geography', 'History', 'General Paper', 'Project Work', 'Chinese Language', 'Art', 'Mathematics', 'Science', 'Computing', 'Physical Education', 'Literature in English'];
    let subjectsDisplay = subjects.map(subject => (
      <ListItem
        key={subject}
        button onPress={() => this.props.navigation.navigate({
          routeName: 'Subject',
          params: {subjectName: subject}
        })}
      >
        <Left>
          <Text>{subject}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ))
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
    };
  };

  render() {
    const {getParam} = this.props.navigation;
    let subjectName = getParam('subjectName', 'Subject Name');
    console.log('subjectName: ', subjectName);
    return (
      <View style={{margin:10}}>
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