            
               import React, { Component } from 'react';
               import {
                 StyleSheet,
                 Text,
                 View,
                 TouchableHighlight,
                 Image,
                 Alert,
                 ScrollView,
                 TextInput,
                 FlatList
               } from 'react-native';
               
               export default class Notififactions extends Component {
               
                 constructor(props) {
                   super(props);
                   this.state = {

                   };
                 }
               
                 onClickListener = (viewId) => {
                   Alert.alert("Alert", "Button pressed "+viewId);
                 }
               
                 render() {
                   return (
                     <ScrollView style={styles.container}>
                         <Text style={{marginTop: 25, textAlign: 'center', fontWeight: '600', fontSize: 20}}>Notifications</Text>

                         <View style={styles.rome}>
            <Text style={{margin: 15, color: 'gray', fontWeight: '500', width: '100%'}}>Today, 03 oct 2021 </Text>

            <View style={styles.chatt}>
              <Image source={require('../image/noimage.jpg')} alt='' 
              style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
              <View style={styles.info}>
                  <Text style={styles.name}>SELL
                  </Text>
                  <Text style={styles.read}  numberOfLines = { 1 } ellipsizeMode = 'tail'>Sold to @ola@gmail.com </Text>
              </View>
              <Text style={{marginTop: 10, position: 'absolute', marginLeft: '67%', fontWeight: '600',}} > +N259,000.00</Text>
              </View>

              <View style={styles.chatt}>
              <Image source={require('../image/noimage.jpg')} alt='' 
              style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
              <View style={styles.info}>
                  <Text style={styles.name}>BUY
                  </Text>
                  <Text style={styles.read}  numberOfLines = { 1 } ellipsizeMode = 'tail'>Sold to @ola@gmail.com </Text>
              </View>
              <Text style={{marginTop: 10, position: 'absolute', marginLeft: '67%', fontWeight: '600',}} > -N159,000.00</Text>
              </View>
           </View>

           <View style={styles.rome}>
            <Text style={{margin: 15, color: 'gray', fontWeight: '500', width: '100%'}}>Yesterday, 02 oct 2021 </Text>

            <View style={styles.chatt}>
              <Image source={require('../image/noimage.jpg')} alt='' 
              style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
              <View style={styles.info}>
                  <Text style={styles.name}>FUNDED WALLET
                  </Text>
                  <Text style={styles.read}  numberOfLines = { 1 } ellipsizeMode = 'tail'>Via Visa card ***475 </Text>
              </View>
              <Text style={{marginTop: 10, position: 'absolute', marginLeft: '67%', fontWeight: '600',}} > +N259,000.00</Text>
              </View>

              <View style={styles.chatt}>
              <Image source={require('../image/noimage.jpg')} alt='' 
              style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
              <View style={styles.info}>
                  <Text style={styles.name}>Buy
                  </Text>
                  <Text style={styles.read}  numberOfLines = { 1 } ellipsizeMode = 'tail'>Sold to @ola@gmail.com </Text>
              </View>
              <Text style={{marginTop: 10, position: 'absolute', marginLeft: '67%', fontWeight: '600',}} > -N159,000.00</Text>
              </View>

              <View style={styles.chatt}>
              <Image source={require('../image/noimage.jpg')} alt='' 
              style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
              <View style={styles.info}>
                  <Text style={styles.name}>Invitation
                  </Text>
                  <Text style={styles.read}  numberOfLines = { 1 } ellipsizeMode = 'tail'> @ola@gmail.com sent you an invitation </Text>
              </View>
              {/* <Text style={{marginTop: 10, position: 'absolute', marginLeft: '67%', fontWeight: '600',}} > -N159,000.00</Text> */}
              </View>
           </View>
                     </ScrollView>
                   );
                 }
               }
               
               const styles = StyleSheet.create({
                 container: {
                   flex: 1,
                   backgroundColor: 'white',
                 },
                 rome:{
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
              },
              chatt: {
                  height: 60,
                  width: '100%',
                  backgroundColor: 'rgb(238, 238, 238)',
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'row'
                },
                info: {
                  display: 'flex',
                  flexDirection: 'column'
            
                },
                name:{
                  fontSize: 18,
                  fontWeight: '700',
                  marginLeft: 10,
                  marginTop: 5,
                },
                text:{
                  fontSize: 14,
                  fontWeight: '500',
                  marginLeft: 10,
                  marginTop: 10,
                  color: 'rgb(75, 75, 75)',
                  width: '80%'
                },
                read:{
                  fontSize: 14,
                  fontWeight: '500',
                  marginLeft: 10,
                  marginTop: 10,
                  color: 'gray',
                  width: '100%'
                }
               }); 