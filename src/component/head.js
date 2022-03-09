import React from 'react'
import { View, StyleSheet,TouchableHighlight, Text} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
 


const Head = ({img, drawer})=>{

    

    return(
        <View>
            <View style={styles.header}>
            <TouchableHighlight onPress={drawer}>
                       <View style={{marginLeft: 10, marginTop: 13}}>
                       <Feather name="align-justify" size={30} color="black" />
                      </View>
                    </TouchableHighlight> 
                     
                   <Text style={{marginTop: 20, fontSize: 16, fontWeight: "500", color: 'orange'}}>Welcome, 
                   <Text  style={{fontWeight: "700", color:"black"}}> Pharrel Williams</Text>
                   </Text>
                    {img}
                    
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'rgb(226, 226, 226)',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 20,

    }
})

export default Head;