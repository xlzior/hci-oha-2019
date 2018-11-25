import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, H2, Body, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';

export default class FAQs extends Component {
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
    let FAQsDisplay = [];

    const data = this.props.screenProps;
    //Render each faq element from data obtained from firebase
    for(let faq in data["FAQ"]){
      let question = data["FAQ"][faq];
      let display = (
        <Card style={styles.card} key={faq}>
          <H2 style={styles.H2}>{question["Question"]}</H2>
          <Text>{question["Answer"]}</Text>
        </Card>
      );

      //render only if searched for, or if searchbar empty.
      if(this.isSearched(question["Question"])){
        FAQsDisplay.push(display);
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
        {FAQsDisplay}
      </NavigationBar>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  H2: {
    marginBottom: 15
  }
})