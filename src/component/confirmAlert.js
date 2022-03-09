import React, {useState} from 'react'
import {Modal, StyleSheet, Text, Button, View} from 'react-native'

const ConfirmAlert = ({visible, okay, cancel})=>{

   // const [visible, setVisible] = useState()

    return(
        <View style={styles.centeredView}>
            <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            >
            <View style={styles.centeredView.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textStyle}> Delete Chat</Text>
                    <View style={{width: '100%', height: 0.5, backgroundColor: 'white', marginVertical: 15}}></View>
                    <Text style={styles.msg}>Are you sure you want to delete this chat ?</Text>
                    <View style={{marginTop: 40, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', }}>
                        <Button color='rgb(42, 194, 42)' title='Okay' onPress={okay}  />
                        <Button color='rgb(211, 46, 46)' title='Cancel' onPress={cancel} />
                    </View>
                </View>
            </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        
    },
    modalView: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 90,
        backgroundColor: 'rgb(44, 41, 41)',
        borderRadius: 10,
        padding: 15,
        textAlignVertical: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    msg:{
       color: 'white',
       fontSize: 16
    }
})

export default ConfirmAlert;