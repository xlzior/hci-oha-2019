require('core-js/es6/array')
import React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import HomeScreen from './components/HomeScreen'
import MapView from './components/MapView';
import Schedule from './components/Schedule';
import TourRoutes from './components/TourRoutes';
import About from './components/About';
import CCA from './components/CCA';
import Curriculum from './components/Curriculum';
import FAQs from './components/FAQs';
import AboutTheApp from './components/AboutTheApp';

// Firebase
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBCQvgICC-zwInatiHgbPmOGkvs91l3A8o",
  authDomain: "hci-oha-2019.firebaseapp.com",
  databaseURL: "https://hci-oha-2019.firebaseio.com/",
  storageBucket: "hci-oha-2019.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const CustomDrawerContentComponent = (props) => {
  let normalOnItemPress = props.onItemPress
  props = {...props, onItemPress: item => {
    // intercept original onItemPress to reset the params for the 'Map' route
    // when Map is accessed via the drawer, params are set to null
    if (item.route.routeName == 'Map') {
      item.route.params = {
        markers: [],
        highlighted: null
      }
    }
    normalOnItemPress(item)
  }}
  return (
    <ScrollView>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props}/>
      </SafeAreaView>
    </ScrollView>
  )
};

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
  initialRouteName: 'Home',
  contentComponent: CustomDrawerContentComponent
});

// Back-end loading of data from Firebase
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
      asyncStorage: {},
      lastPull: ""
    }
    this.datastoreRef = firebaseApp.database().ref();
  }

  fetchFromFirebase(datastoreRef) {
    return datastoreRef.once("value", datastore => {
      datastore.forEach(element => {
        this.storeAsync(element.key, element.val());
      });

      let lastPull = new Date().toISOString();
      this.setState({lastPull})
      AsyncStorage.setItem("lastPull", lastPull);
    });
  }

  async storeAsync(key, value) {
    console.log("storing into async storage...")
    let asyncStorage = this.state.asyncStorage;
    asyncStorage[key] = value;

    this.setState({asyncStorage});

    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error saving data", error)
    }
  }

  fetchAsync() {
    let asyncStorage = JSON.parse(JSON.stringify(this.state.asyncStorage));

    return AsyncStorage.getAllKeys()
    .then(keys => {
      for (let key of keys) {
        AsyncStorage.getItem(key)
        .then(value => {
          if (key != 'lastPull') value = JSON.parse(value)
          if (value != " ") asyncStorage[key] = value;
        })
        .catch(e => {
          console.log(`Error retrieving ${key} from AsyncStorage`, e);
          this.fetchFromFirebase(this.datastoreRef);
        })
      }
      this.setState({asyncStorage})
    })
    .catch(e => {
      console.log("Error getting keys from AsyncStorage", e);
      this.fetchFromFirebase(this.datastoreRef);
    })
  }

  checkAsync() {
    console.log('checking async storage...');
    return AsyncStorage.getItem("lastPull")
    .then(lastPull => {
      this.setState({lastPull})
      this.datastoreRef.child('lastUpdate').once("value", lastUpdate => {
        lastUpdate = lastUpdate.toJSON()
        // update database only if last pull is older than the last data update
        if (!lastPull || lastPull < lastUpdate) {
          console.log("new updates available from Firebase")
          this.fetchFromFirebase(this.datastoreRef);
        } else {
          console.log("asyncStorage is up to date with Firebase")
          // if the async storage is still up to date, retrieve data and set it to state
          this.fetchAsync()
        }
      });
    })
    .catch(e => {
      console.log("Error retrieving lastPull from AsyncStorage", e);
      this.fetchFromFirebase(this.datastoreRef);
    })
  }

  async fetchResources() {
    // load font
	  let fontLoading = Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })

    // load data
    let checkAsyncStorage = this.checkAsync();
    let timeout = new Promise ((resolve) => {
      setTimeout(resolve, 5000, 'timeout');
    })
    let dataLoading = Promise.race([checkAsyncStorage, timeout])
    .then(value => {
      if (value == 'timeout') return this.fetchFromFirebase(this.datastoreRef)
    })

    // wait for both to be done
    return Promise.all([fontLoading, dataLoading])
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={() => this.fetchResources()}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return <RootDrawer screenProps={{data: this.state.asyncStorage, downloadData: () => this.fetchFromFirebase(this.datastoreRef)}}/>;
  }
}