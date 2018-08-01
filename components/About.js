import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, H1, H2, Card } from 'native-base';

import NavigationBar from './NavigationBar';

export default class About extends Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <Card style={styles.card}>
          <H1>Our Mission</H1>
          <Text>We nurture leaders in Research, Industry and Government to serve the nation.</Text>
        </Card>

        <Card style={styles.card}>
          <H1>Our Vision</H1>
          <Text>Defining Holistic Education, and Empowering our students to Live with Passion and Lead with Compassion</Text>
        </Card>

        <Card style={styles.card}>
          <H1>School Motto</H1>
          <H2>自强不息</H2>
          <Text>Tireless self-improvement with tenacity, innovation and passion</Text>
        </Card>
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