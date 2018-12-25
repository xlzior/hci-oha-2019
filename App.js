import React from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View } from 'native-base';
import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen'
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

const RootDrawer = createDrawerNavigator({
  Home: HomeScreen,
  About: About,
  Schedule: Schedule,
  Map: {
    screen: MapView,
    params: { markers: [], highlighted: null }
  },
  "Tour Routes": TourRoutes,
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
      asyncStorage: {},
      last_update: ""
    }
    this.datastoreRef = firebaseApp.database().ref();
  }

  listenForItems(datastoreRef) {
    datastoreRef.once("value", datastore => {
      datastore.forEach(element => {
        this.storeAsync(element.key, element.val());
      });

      let last_update = JSON.stringify(new Date().toISOString());
      this.setState({last_update})
      AsyncStorage.setItem("last_update", last_update);
    });
    this.setState({ dataLoaded: true })
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
    return AsyncStorage.getItem("last_update")
    .then(last_update => {
      this.setState({last_update})

      const DATA_SHELF_LIFE = 4 // days
      let outdated = new Date();
      outdated.setDate(outdated.getDate() - DATA_SHELF_LIFE);
      outdated = JSON.stringify(outdated.toISOString())

      // update database only if last update was more than 4 days ago
      if (last_update == null || last_update < outdated) this.listenForItems(this.datastoreRef);
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
      this.setState({ dataLoaded: true })
    })
    .catch(e => {
      this.listenForItems(this.datastoreRef);
      console.log("Error retrieving last_update from AsyncStorage", e);
    })
  }

  async componentDidMount() {
	  Expo.Font.loadAsync({
      'Roboto':require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    .then(() => this.setState({ fontLoaded: true}))
    // .catch(() => this.setState({ fontLoaded: true}));

    let fetchAsyncStorage = this.fetchAsync();
    let timeout = new Promise ((resolve) => {
      setTimeout(resolve, 5000, 'timeout');
    })

    Promise.race([fetchAsyncStorage, timeout])
    .then(value => {
      if (value == 'timeout') this.listenForItems(this.datastoreRef)
    })
  }

  render() {
    let {fontLoaded, dataLoaded} = this.state;
    if (!fontLoaded || !dataLoaded) return <View style={styles.center}><Text>Loading...</Text></View>
    return <RootDrawer screenProps={data=this.state.asyncStorage}/>;
  }
}

