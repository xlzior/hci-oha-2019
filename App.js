import React from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View } from 'native-base';
import { AppLoading } from 'expo';
import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen'
import MapView from './components/MapView';
import Schedule from './components/Schedule';
import TourRoutes from './components/TourRoutes';
import About from './components/About';
import CCA from './components/CCA';
import Curriculum from './components/Curriculum';
import FAQs from './components/FAQs';
import AboutTheApp from './components/AboutTheApp';
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

const RootDrawer = createDrawerNavigator({
  Home: HomeScreen,
  "About Hwa Chong": About,
  Schedule: Schedule,
  Map: {
    screen: MapView,
    params: { markers: [], highlighted: null }
  },
  "Tour Routes": TourRoutes,
  Curriculum: Curriculum,
  CCAs: CCA,
  FAQs: FAQs,
  "About The App": AboutTheApp
},
{
  initialRouteName: 'Home'
});

// Back-end loading of data from Firebase
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
      asyncStorage: {},
      lastUpdate: ""
    }
    this.datastoreRef = firebaseApp.database().ref();
  }

  listenForItems(datastoreRef) {
    return datastoreRef.once("value", datastore => {
      datastore.forEach(element => {
        this.storeAsync(element.key, element.val());
      });

      let lastUpdate = JSON.stringify(new Date().toISOString());
      this.setState({lastUpdate})
      AsyncStorage.setItem("lastUpdate", lastUpdate);
    });
  }

  async storeAsync(key, value) {
    console.log("storing into async storage...")
    let asyncStorage = this.state.asyncStorage;
    asyncStorage[key] = value;

    this.setState({ asyncStorage });

    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error saving data", error)
    }
  }

  fetchAsync() {
    console.log('fetching from async storage...');
    return AsyncStorage.getItem("lastUpdate")
    .then(lastUpdate => {
      this.setState({lastUpdate})

      const DATA_SHELF_LIFE = 4 // days
      let outdated = new Date();
      outdated.setDate(outdated.getDate() - DATA_SHELF_LIFE);
      outdated = JSON.stringify(outdated.toISOString())

      // update database only if last update was more than 4 days ago
      if (lastUpdate == null || lastUpdate < outdated) this.listenForItems(this.datastoreRef);
      else {
        // if the async storage is still up to date, retrieve data and set it to state
        let asyncStorage = this.state.asyncStorage;

        AsyncStorage.getAllKeys()
        .then(keys => {
          for (let key of keys) {
            AsyncStorage.getItem(key)
            .then(value => {
              if (value != " ") asyncStorage[key] = JSON.parse(value);

              this.setState({asyncStorage});
            })
            .catch(e => {
              this.listenForItems(this.datastoreRef);
              console.log(`Error retrieving ${key} from AsyncStorage`, e);
            })
          }
        })
        .catch(e => {
          this.listenForItems(this.datastoreRef);
          console.log("Error getting keys from AsyncStorage", e);
        })
      }
    })
    .catch(e => {
      this.listenForItems(this.datastoreRef);
      console.log("Error retrieving lastUpdate from AsyncStorage", e);
    })
  }

  async fetchResources() {
    // load font
	  let fontLoading = Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })

    // load data
    let fetchAsyncStorage = this.fetchAsync();
    let timeout = new Promise ((resolve) => {
      setTimeout(resolve, 5000, 'timeout');
    })
    let dataLoading = Promise.race([fetchAsyncStorage, timeout])
    .then(value => {
      if (value == 'timeout') return this.listenForItems(this.datastoreRef)
    })

    // wait for both to be done
    return Promise.all([fontLoading, dataLoading])
  }

  render() {
    let {isReady} = this.state;
    if (!isReady) {
      return (
        <AppLoading
          startAsync={() => this.fetchResources()}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return <RootDrawer screenProps={{data: this.state.asyncStorage, downloadData: () => this.listenForItems(this.datastoreRef)}}/>;
  }
}

