import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-tutorial-slider'
 
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: '100%',
  }
});
 
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
  //  image: require('../image/details-1.jpeg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
   // image: require('../image/details-2.jpeg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
   // image: require('../image/details-3.jpeg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

const AppSlider = ({navigation}) => {

  return(

    <AppIntroSlider
        slides={slides}
        onDone={()=> navigation.push('AuthView')}
      />
  )
}

export default AppSlider;