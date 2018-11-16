import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, H2, Body } from 'native-base';

import NavigationBar from './NavigationBar';

export default class FAQs extends Component {
  render() {
    let FAQsDisplay = [];
    const data = this.props.screenProps;
    for(let faq in data["FAQ"]){
      let display = (
        <Card style={styles.card} key={faq}>
          <H2 style={styles.H2}>{data["FAQ"][faq]["Question"]}</H2>
          <Text>{data["FAQ"][faq]["Answer"]}</Text>
        </Card>
      );
      FAQsDisplay.push(display);
    }
    return (
      <NavigationBar {...this.props}>
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