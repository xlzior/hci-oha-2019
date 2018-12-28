import { StyleSheet, Dimensions } from 'react-native';

var fullwidth = Dimensions.get('window').width; //full width
var fullheight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold'
  },
  h1HeaderText: {
    textAlign: 'center',
    margin: 10,
  },
  h2HeaderText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  fullWidth: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: { //Image from App.js (Main Image)
    height: 250,
    alignSelf: 'center',
    marginBottom: 10
  },
  contentImage: {
    flex: 1,
    marginBottom: 10
  },
  button: {
    margin: 5,
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    padding: 20,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  cardTitle: {
    marginBottom: 20,
  },
  link: {
    color: '#0B7DFD',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  margins: {
    marginTop: 10,
    marginBottom: 5
  }
})

export default styles;