import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, H2, Body } from 'native-base';

import NavigationBar from './NavigationBar';

export default class FAQs extends Component {
  render() {
    let FAQs = [
      {
        question: "What are my chances of entering HCI as a JAE student?",
        answer: "Very high, if you put HCI as first choice and meet our admission cutoff. In fact, you stand an even higher chance of entering HCI with the increasing number of schools going IP and especially with the establishment of a new IP JC this year."
      },
      {
        question: "Will I be able to fit into HCI as a JAE student?",
        answer: "HCI has a very inclusive school culture. Our week-long orientation programme with fun and games helps you to ease into school life. Allocation of classes is also based on subject combination with no distinction made between IP and JAE students. You will certainly make new friends and even find some of your secondary school mates in your new classes."
      },
      {
        question: "Can I catch up with my classmates as a JAE student?",
        answer: "Various academic departments have prepared materials and resources catered specifically for JAE students. This will ensure that you can jump right into seminars and tutorials once the academic schedule begins. Your classmates are also a source of help and support. In fact, Hwachongians pride themselves on being a huge family and you’re now part of it!\nOur caring teachers are also more than happy to facilitate your learning and answer your queries in consultations."
      }
    ];
    let FAQsDisplay = FAQs.map(({question, answer}) => (
      <Card style={styles.card} key={question}>
        <Body>
          <H2>{question}</H2>
          <Text>{answer}</Text>
        </Body>
      </Card>
    ))
    return (
      <NavigationBar {...this.props}>
        {FAQsDisplay}
      </NavigationBar>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginTop: 5,
    marginBottom: 10
  }
})