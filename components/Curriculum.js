import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text, H1, H2, List, ListItem, Left, Right, Icon, View } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from './NavigationBar';

class ListView extends Component {
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
      if(subject.startsWith("Humanities-")){
        humanities.push(display);
      }else if(subject.startsWith("Sciences-")){
        sciences.push(display);
      }
    }

    return (
      <NavigationBar {...this.props}>
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
    return (
      <Content style={{padding:20}}>
        <View style={{marginBottom: 100}}>
          <H2 style={styles.title}>Contact:</H2>
          <Text>{contact}</Text>
          <H2 style={styles.title}>Description:</H2>
          <Text>{description}</Text>
        </View>
      </Content>
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
  Curriculum: {
    screen: ListView,
    navigationOptions: ({
      header: null
    })
  },
  Subject: Subject,
});