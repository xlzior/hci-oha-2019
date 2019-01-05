import React, { Component } from 'react';
import { Text, Card, H3, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';
import styles from './Style';
import Hyperlink from 'react-native-hyperlink';

export default class FAQs extends Component {
  state = {
    searchTerm: ""
  }

  isSearched(question){
    let search = this.state.searchTerm.toLowerCase();
    
    if(search == "") return true; // Search bar empty
    if(question.toLowerCase().includes(search)) return true;
  }

  render() {
    let FAQsDisplay = [];
    const data = this.props.screenProps.data["FAQ"];

    //Render each FAQ from data obtained from firebase
    for(let faq in data){
      let {Question, Answer} = data[faq];
      let display = (
        <Card style={styles.card} key={faq}>
          <H3 style={styles.h3HeaderText}>{Question}</H3>
          <Hyperlink linkDefault linkStyle={styles.link}>
            <Text>{Answer}</Text>
          </Hyperlink>
        </Card>
      );

      //render only if searched for, or if searchbar empty.
      if(this.isSearched(Question)){
        FAQsDisplay.push(display);
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
        {FAQsDisplay}
      </NavigationBar>
    )
  }
}