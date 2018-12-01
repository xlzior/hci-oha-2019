import { StyleSheet,Dimensions  } from 'react-native';

var fullwidth = Dimensions.get('window').width; //full width
var fullheight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    image: { //Image from App.js (Main Image)
      height: 250,
      alignSelf: 'center',
      marginBottom: 10
    },
    button: {
      margin: 5,
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    mainContainer: {
      margin: 20,
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    h1HeaderText : {
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold'
    },
    contentImage: {
        flex:1, 
        marginBottom:10
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
      fontWeight: '600'
    }
  })

export default styles;