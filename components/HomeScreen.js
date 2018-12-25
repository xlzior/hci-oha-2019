import React from 'react';
import { Image } from 'react-native';
import { Text, H1, H2, Button, View } from 'native-base';

import NavigationBar from './NavigationBar';
import styles from './Style';

// Front-end HomeScreen elements
export default class HomeScreen extends React.Component {
  generateButton(route) {
    return (
      <Button light
        key={route}
        style={styles.button}
        onPress={() => this.props.navigation.navigate(route)}
      >
        <Text style={{textAlign: 'center'}}>{route == 'About' ? 'About Hwa Chong' : route}</Text>
      </Button>
    )
  }

  generateButtonGrid(buttons) {
    let buttonsList = buttons.map(b => this.generateButton(b))
    let buttonRows = [];
    for (let i = 0; i < buttonsList.length; i += 2) {
      buttonRows.push(
        <View
          style={{display: 'flex', flexDirection: 'row', flex: 1}}
          key={i}
        >
          {buttonsList.slice(i, i+2)}
        </View>
      )
    }
    // 2 by 2 grid
    return (
      <View style={{display: 'flex'}}>
        {buttonRows}
      </View>
    )
  }

  render() {
    return (
      <NavigationBar {...this.props}>
        <View style={styles.mainContainer}>
          <Image
            source={require('../images/mosaic.png')}
            resizeMode='contain'
            style={styles.image}
          />
          <H1 style={styles.h1HeaderText}>Hwa Chong Institution{"\n"}College Open House 2019</H1>
          <View style={{marginTop: 10, alignItems: 'stretch'}}>
            <Text style={{textAlign: 'center'}}>
              Hello there! Welcome to Hwa Chong's Open House 2019, where you join us in creating this colourful and spectacular masterpiece, one that we call home, as Hwa Chongians.
            </Text>
            <H2 style={styles.h2HeaderText}>What would you like to explore?</H2>
            {this.generateButtonGrid(['About', 'Schedule', 'Map', 'Tour Routes','Curriculum', 'CCAs'])}
            <H2 style={styles.h2HeaderText}>Still have questions?</H2>
            <View style={styles.fullWidth}>
              {this.generateButton('FAQs')}
            </View>
          </View>
        </View>
      </NavigationBar>
    );
  }
}

