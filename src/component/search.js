            
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
               import { AntDesign } from '@expo/vector-icons';

               import {baseUrl, scolor, pcolor, mcolor,bcolor} from './konst'
               
               export default class Search extends Component {
               
                 constructor(props) {
                   super(props);
                   this.state = {
                       search: '',
                       data: [
                       {id:1, icon:"https://bootdey.com/img/Content/avatar/avatar1.png", description: "User 1"},
                       {id:2, icon:"https://bootdey.com/img/Content/avatar/avatar2.png", description: "User 2"}, 
                       {id:3, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 3"}, 
                       {id:4, icon:"https://bootdey.com/img/Content/avatar/avatar4.png", description: "User 4"}, 
                       {id:5, icon:"https://bootdey.com/img/Content/avatar/avatar5.png", description: "User 5"}, 
                       {id:6, icon:"https://bootdey.com/img/Content/avatar/avatar6.png", description: "User 6"}, 
                       {id:7, icon:"https://bootdey.com/img/Content/avatar/avatar1.png", description: "User 7"}, 
                       {id:8, icon:"https://bootdey.com/img/Content/avatar/avatar2.png", description: "User 8"},
                       {id:9, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 9"},
                     ],
                   };
                 }
               
                 onClickListener = (viewId) => {
                   Alert.alert("Alert", "Button pressed "+viewId);
                 }
               
                 goBack = ()=>{
               
                     this.props.navigation.goBack()
                  }
                 render() {

                    let show = this.state.search === '' ? 'none' : 'flex'
                   return (
                     <View style={styles.container}>
                         <View style={{height: 40, width: '100%',flexDirection: 'row', marginTop: 30, marginBottom: 0}}>
                         <TouchableHighlight onPress={this.goBack}>
                         <View style={{marginLeft: 14, marginTop: 6}}><AntDesign name="leftcircle" size={28} color="white" /></View>
                         </TouchableHighlight>

                         <View style={{ width: '90%', marginBottom: 0,
                          height: 35, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{width: '88%', height: '90%',borderColor: scolor, marginTop:5,
                           borderWidth: 1,borderRadius: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
                           <TextInput
                           onChangeText={text => this.setState({search: text})}
                           placeholder='Search user'
                           placeholderTextColor={bcolor}
                            value={this.state.search}
                             autoCorrect={true}
                             autoCapitalize='none'
                            multiline={true} style={{color: bcolor,  height: 30, fontSize: 15, width: '82%', padding: 10}} /> 
                             <TouchableHighlight style={{display: show}} onPress={()=>{this.setState({search: ''})}}>
                              <Text style={{color: mcolor, marginRight: 15, fontSize: 17, fontWeight: '500'}}>Clear</Text>
                               </TouchableHighlight>
                             </View>
                
                              </View> 
                       </View>
               
                       <FlatList 
                         style={styles.notificationList}
                         data={this.state.data}
                         keyExtractor= {(item) => {
                           return item.id;
                         }}
                         renderItem={({item}) => {
                           return (
                             <View style={styles.notificationBox}>
                               <Image style={styles.image}
                                 source={{uri: item.icon}}/>
                               
                               <Text style={styles.name}>{item.description}</Text>
                             </View>
                           )}}/>
                     </View>
                   );
                 }
               }
               
               const styles = StyleSheet.create({
                 container: {
                   flex: 1,
                   backgroundColor: 'black',
                 },
                 formContent:{
                   flexDirection: 'row',
                   marginTop:30,
                 },
                 inputContainer: {
                     borderBottomColor: '#F5FCFF',
                     backgroundColor: '#FFFFFF',
                     borderRadius:30,
                     borderBottomWidth: 1,
                     height:45,
                     flexDirection: 'row',
                     alignItems:'center',
                     flex:1,
                     margin:10,
                 },
                 icon:{
                   width:30,
                   height:30,
                 },
                 iconBtnSearch:{
                   alignSelf:'center'
                 },
                 inputs:{
                     height:45,
                     marginLeft:16,
                     borderBottomColor: '#FFFFFF',
                     flex:1,
                 },
                 inputIcon:{
                   marginLeft:15,
                   justifyContent: 'center'
                 },
                 notificationList:{
                   marginTop:20,
                   padding:10,
                 },
                 notificationBox: {
                   paddingTop:10,
                   paddingBottom:10,
                   marginTop:5,
                   backgroundColor: 'rgb(43, 43, 43)',
                   flexDirection: 'row',
                   borderRadius:10,
                 },
                 image:{
                   width:45,
                   height:45,
                   borderRadius:20,
                   marginLeft:20
                 },
                 name:{
                   fontSize:20,
                   fontWeight: 'bold',
                   color: "white",
                   marginLeft:10,
                   alignSelf: 'center'
                 },
               }); 