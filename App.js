import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, H1, H2, Button, View } from 'native-base';
import { createDrawerNavigator } from 'react-navigation';

import NavigationBar from './components/NavigationBar';

import MapView from './components/MapView';
import Schedule from './components/Schedule';
import TourRoutes from './components/TourRoutes';
import About from './components/About';
import CCA from './components/CCA';
import Curriculum from './components/Curriculum';
import FAQs from './components/FAQs';

class HomeScreen extends React.Component {
  generateButtonGrid(buttons) {
    let buttonsList = buttons.map(route => {
      return (
        <Button light
          key={route}
          style={styles.button}
          onPress={() => this.props.navigation.navigate(route)}
        >
          <Text>{route}</Text>
        </Button>
      )
    })

    return (
      <View style={{display: 'flex'}}>
        <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
          {buttonsList.slice(0, 2)}
        </View>
        <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
          {buttonsList.slice(2)}
        </View>
      </View>
    )
  }
  render() {
    let ohaDisplay = this.generateButtonGrid(['Schedule', 'Map', 'Tour Routes', 'Redemption'])
    let hciDisplay = this.generateButtonGrid(['About', 'Curriculum', 'CCAs', 'FAQs'])

    return (
      <NavigationBar {...this.props}>
        <Image
          source={require('./images/mosaic.png')}
          resizeMode='contain'
          style={{height: 250, alignSelf: 'center'}}
        />
        <H1 style={styles.H1}>Hwa Chong Institution</H1>
        <H1 style={styles.H1}>College Open House 2019</H1>
        <Text>
          Welcome to the Open House 2019, where you join us in creating this colourful and spectacular masterpiece, one that we call home, as Hwa Chongians.
        </Text>
        <H2 style={styles.H2}>Open House 2019</H2>
        {ohaDisplay}
        <H2 style={styles.H2}>Hwa Chong Institution</H2>
        {hciDisplay}
      </NavigationBar>
  );
  }
}


const RootDrawer = createDrawerNavigator({
  Home: HomeScreen,
  Map: MapView,
  Schedule: Schedule,
  "Tour Routes": TourRoutes,
  About: About,
  Curriculum: Curriculum,
  CCA: CCA,
  FAQs: FAQs,
},
{
  initialRouteName: 'Curriculum'
});

export default class App extends React.Component {
  render() {
    return <RootDrawer />;
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  H1 : {
    textAlign: 'center'
  },
  H2: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  }
})