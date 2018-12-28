import React, { Component } from 'react';
import { Text, H1, Card } from 'native-base';

import NavigationBar from './NavigationBar';
import styles from './Style';

export default class About extends Component {
  render() {
    let backup = {
      "Our Mission": "We nurture leaders in Research, Industry and Government to serve the nation.",
      "Our Vision": "Defining Holistic Education, and Empowering our students to Live with Passion and Lead with Compassion",
      "School Motto": "自强不息\nTireless self-improvement with tenacity, innovation and passion"
    }
    let data = this.props.screenProps.data["About"] || backup;
    let display = Object.entries(data).map(element => {
      let [title, body] = element
      return (
        <Card style={styles.card} key={title}>
          <H1>{title}</H1>
          <Text>{body}</Text>
        </Card>
      )
    })
    return (
      <NavigationBar {...this.props}>
        {display}
      </NavigationBar>
    )
  }
}
