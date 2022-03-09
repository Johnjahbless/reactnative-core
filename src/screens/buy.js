import React from 'react'
import {View, Text,  StyleSheet, Image,  TouchableHighlight, 
    ActivityIndicator, ScrollView, TextInput, TouchableOpacity, Button, Touchable} from 'react-native' ;
import {baseUrl} from '../component/konst'
import { AntDesign, Octicons,Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import axios from 'axios'
import FundWallet from '../component/fundwallet';


let dm = [];
let text = '';

const mess = [
  {
    id: 1,
    body: 'i want to buy your ad',
    name: 'Pharrel Williams',
    date: new Date('10/06/2021')
  },
  {
    id: 2,
    body: 'i want to buy your ad',
    name: 'Pharrel',
    date: new Date('10/07/2021')
  }
  ,
  {
    id: 3,
    body: 'Okay',
    name: 'Pharrel',
    date: new Date('10/09/2021')
  }
]
export default class Buy extends React.Component{

    constructor(props){
        super(props)

        this.state = {
           prodouct: {},
           isSelected: false,
           refid: '',
           show: 'none',
           myshow: 'none'
        }

    }

    async componentDidMount(){

      }

  goBack = ()=>{

     this.props.navigation.goBack()
  }

    render(){

      let {} = this.state
      dayjs.extend(relativeTime)

        return(
            <View style={styles.container}>
                
                  <View style={{height: 40, width: '100%',flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
                 <TouchableHighlight onPress={this.goBack}>
                 <View style={{marginLeft: 10, marginTop: 2}}><AntDesign name="leftcircle" size={28} color="black" /></View>
                 </TouchableHighlight>
                 <Text style={{color: 'black', marginLeft: 'auto', 
                 marginTop: 2, fontSize: 22, fontWeight: '600' ,marginRight: 'auto'}}> Input Reference # </Text>
               </View>
               <View style={styles.search}>
                        <Text style={{marginLeft: 10, marginTop: 4}}>
                        <Octicons name="search" size={24} color="black" />
                        </Text>
                        <TextInput 
                        style={{marginLeft: 10, width: '80%'}}
                        placeholder='reference #'
                        placeholderTextColor='black'
                        value={this.state.refid}
                        onChangeText={text => {
                            this.setState({refid: text})
                            if(this.state.refid.trim() !== ''){
                                this.setState({myshow: 'flex'})
                            }
                            else{
                                this.setState({myshow: 'none'})
                            }
                        }}
                        />
                    </View>
                    <View style={{width: '100%', height: 'auto', display: this.state.myshow, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 180, height: 45, marginTop: 10,borderRadius: 8,
                         backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'rgb(1, 1, 48)', fontWeight: '600', fontSize: 18}}>Search</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={{width: '100%', height: 'auto', borderTopWidth: 1,
                     borderStartColor: 'rgb(197, 197, 197)', marginTop: 5, display: this.state.show}}>
                    <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 22, marginTop: 10}}>Summary</Text>
                    <Image style={{width: '100%', height: 280, alignSelf: 'center',resizeMode: 'center', marginTop: 10}}
                     source={require('../image/phone.jpg')} />

                  <Text style={{color: 'gray', marginLeft: 25, marginTop: 12, fontSize: 17}}>Seller Email: </Text>
                    <Text style={{marginLeft: 25, fontSize: 16}}>Olanide@gmail.com</Text>

                    <Text style={{color: 'gray', marginLeft: 25, marginTop: 12, fontSize: 17}}>Product name: </Text>
                    <Text style={{marginLeft: 25, fontSize: 16}}>Iphone 6</Text>

                    <Text style={{color: 'gray', marginLeft: 25, marginTop: 12, fontSize: 17}}>Price: </Text>
                    <Text style={{marginLeft: 25, fontSize: 16}}>N14,889.00</Text>

                    <Text style={{color: 'gray', marginLeft: 25, marginTop: 12, fontSize: 17}}>Quantity: </Text>
                    <Text style={{marginLeft: 25, fontSize: 16}}>1</Text>

                    <Text style={{color: 'gray', marginLeft: 25, marginTop: 12, fontSize: 17}}>Description: </Text>
                    <Text style={{marginLeft: 25, fontSize: 16, width: '90%'}}>
                        N14,889.00</Text>

                    <Text style={{color: 'gray', marginLeft: 25, marginTop: 12, fontSize: 17}}>Location: </Text>
                    <Text style={{marginLeft: 25, fontSize: 16}}>Yaba str, lagos</Text>

                    <View style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{width: 180, height: 45, marginTop: 20,borderRadius: 8, marginBottom: 5,
                     backgroundColor: 'rgb(1, 1, 48)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>Buy</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
               <TouchableOpacity onPress={()=>{
                   this.setState({isSelected: !this.state.isSelected})
               }}>
                   {this.state.isSelected ? <AntDesign name="checksquareo" size={24} color="black" />:
                    <Feather name="square" size={24} color="black" />
                   }
               
               </TouchableOpacity>
                  <Text style={styles.label}>Accept terms and condition to continue</Text>
               </View>

                </ScrollView>
                    
                    
                    <FundWallet camvisible={false} />
             
      </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%'
    }, 
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        width: '90%',
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      label: {
        margin: 8,
      },
   search:{
       width: '90%',
       height: 35,
       borderWidth: 1,
       borderRadius: 25,
       marginLeft: 'auto',
       marginRight: 'auto',
       borderColor: 'rgb(197, 197, 197)',
       display: 'flex',
       flexDirection: 'row'
   },
   filter:{
       width: '100%',
       height: 'auto',
       display: 'flex',
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 10
   },
   filt:{
       fontSize: 20,
       fontWeight: '600',
       color: 'rgb(6, 1, 87)cc',
       marginRight: 15
   },
   pick:{
       width: '60%',
       height: 35,
       borderWidth: 1,
       borderColor: 'rgb(6, 1, 87)',
       borderRadius: 25,
       backgroundColor: 'rgb(6, 1, 87)',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       paddingLeft: 10,
       color: 'white'
   },
   card:{
       height: 'auto',
       width: '98%',
       display: 'flex',
       flexDirection: 'column',
       marginTop: 15,
       marginLeft: '1%'
   },
   media:{
    width: '100%',
    height: 370
},
    pac:{
        fontWeight: '600',
        fontSize: 14,
        color: 'rgb(6, 1, 87)'
    },
    pack: {
        fontWeight: '400'
    },
    contact:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        backgroundColor: 'rgb(6, 1, 87)',
        marginTop: 4
    },
    con:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
  })

