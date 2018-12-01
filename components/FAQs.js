import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, H2, Body, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';
import styles from './Style';
import Hyperlink from 'react-native-hyperlink';

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
          <H2 style={styles.cardTitle}>{question["Question"]}</H2>
          <Hyperlink linkDefault = {true} linkStyle = {styles.link}>
            <Text>{question["Answer"]}</Text>
          </Hyperlink>
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