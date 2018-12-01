import React from 'react';
import { StyleSheet, Image, AsyncStorage } from 'react-native';
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
import styles from './components/Style';

// Firebase
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBCQvgICC-zwInatiHgbPmOGkvs91l3A8o",
  authDomain: "hci-oha-2019.firebaseapp.com",
  databaseURL: "https://hci-oha-2019.firebaseio.com/",
  storageBucket: "hci-oha-2019.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Front-end HomeScreen elements
class HomeScreen extends React.Component {
  generateButton(route) {
    return (
      <Button light
        key={route}
        style={styles.button}
        onPress={() => this.props.navigation.navigate(route, {test: "Moooo"})}
      >
        <Text>{route == 'About' ? 'About Hwa Chong' : route}</Text>
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
    console.log(this.props.navigation.state);
    return (
      <NavigationBar {...this.props}>
        <View style={styles.mainContainer}>
          <Image
            source={require('./images/mosaic.png')}
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


const RootDrawer = createDrawerNavigator({
  Home: HomeScreen,
  Map: MapView,
  Schedule: Schedule,
  "Tour Routes": TourRoutes,
  About: About,
  Curriculum: Curriculum,
  CCAs: CCA,
  FAQs: FAQs,
},
{
  initialRouteName: 'Home'
});

// Back-end loading of data from Firebase
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      dataLoaded: false,
      data: {},
      last_update: ""
    }
    this.datastoreRef = firebaseApp.database().ref();
  }

  listenForItems(datastoreRef) {
    let data = {};
    datastoreRef.once("value", datastore => {
      datastore.forEach(element => {
        data[element.key] = element.val();
        //this.storeAsync(element.key, element.val());
      });

      let last_update = JSON.stringify(new Date().toISOString());
      this.setState({data, last_update})
      AsyncStorage.setItem("last_update", last_update);
    });
  }

  async loadData(){
    this.listenForItems(this.datastoreRef);
  }

  async componentDidMount() {
	  Expo.Font.loadAsync({
      'Roboto':require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    .then(() => this.setState({ fontLoaded: true}))
    // .catch(() => this.setState({ fontLoaded: true}));
    
	  this.loadData()
    .then(() => this.setState({ dataLoaded: true}))
    // .catch(() => this.setState({ dataLoaded: true}));
  }

  render() {
    let {fontLoaded, dataLoaded} = this.state;
    if (!fontLoaded || !dataLoaded) return <View style={styles.center}><Text>Loading...</Text></View>
    return <RootDrawer screenProps={data=this.state.data}/>;
  }
}

