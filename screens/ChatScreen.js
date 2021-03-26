//import liraries
import React, { useLayoutEffect,useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import * as firebase from 'firebase'
import {db, auth} from '../firebase';

// create a component
const ChatScreen = ({navigation,route}) => {
    const [input, setInput] = useState('')
    const [massages, setmassages] = useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Chat',
            headerTitleAlign:'left',
            headerTitle:()=>(
                 <View style={{
                     flexDirection:'row',
                     alignItems:'center',
                 }}>

                      <Avatar rounded source={{
                          uri: 
                          massages[0]?.data.photoURL ||
                           "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                      }}
                      />
                      <Text  style={{
                          color:'white',marginLeft:10,fontWeight:'700'
                      }}>{route.params.chatName}</Text>
                 </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity
                 style={{marginLeft:10}}
                 onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color='#fff'/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80,
                    marginRight:20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white'/>
                    </TouchableOpacity>

                </View>
            )
        })
        
    }, [navigation,massages])

      const sendMassage=()=>{
          Keyboard.dismiss();
          db.collection('chats').doc(route.params.id).collection('massages').add({
              timestamp:firebase.firestore.FieldValue.serverTimestamp(),
              massage:input,
              displayName:auth.currentUser.displayName,
              email:auth.currentUser.email,
              photoURL:auth.currentUser.photoURL,
          })
            setInput('');
      }


       useLayoutEffect(() => {
           const unsubscribe=db
           .collection('chats')
           .doc(route.params.id)
           .collection('massages')
           .orderBy('timestamp','desc')
           .onSnapshot((snapshot)=>setmassages(
               snapshot.docs.map(doc=>({
                   id: doc.id,
                   data: doc.data()
               }))
           ))
           return unsubscribe;
       }, [route])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light'/>
             <KeyboardAvoidingView
              behavior={Platform.OS==="ios"? "padding":"height"}
              style={styles.safeCotainer}
              keyboardVerticalOffset={90}>
               
                  <>
                  <ScrollView contentContainerStyle={{paddingTop:10}}>
                    {massages.map(({id,data})=> 
                    data.email===auth.currentUser.email?(
                        <View key={id} style={styles.receiver} >
                            <Avatar
                            rounded
                            // for the WEB container style
                            containerStyle={{
                                position:'absolute',
                                bottom:-15,
                                right:-5
                            }}
                            position='absolute'
                            bottom={-15}
                            right={-5}
                            size={30}
                            source={{
                                uri:data.photoURL
                            }} />
                            <Text style={styles.recieverText}>{data.massage}</Text>
                        </View>
                    ):(
                        <View style={styles.sender}>
                              <Avatar
                               rounded
                               // for the WEB container style
                               containerStyle={{
                                   position:'absolute',
                                   bottom:-15,
                                   left:-5
                               }}
                               position='absolute'
                               bottom={-15}
                               left={-5}
                               size={30}
                               source={{
                                   uri:data.photoURL
                               }} />
                            <Text style={styles.senderText}>{data.massage}</Text>
                            <Text style={styles.senderName}>{data.displayName}</Text>

                        </View>
                    ) )}
                  </ScrollView>
                  <View style={styles.footer}>
                   <TextInput value={input} 
                   onChangeText={(text)=>setInput(text)} 
                   placeholder='Signal Massage'
                   onSubmitEditing={sendMassage}
                   style={styles.textInput}/>
                 <TouchableOpacity onPress={sendMassage} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color="#2B68E6"/>
                 </TouchableOpacity>
                  </View>
                  </>
               
                  </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
    },

    receiver:{
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'

    },
    recieverText:{
        color:'#000',
        fontWeight:'500',
        marginLeft:10,
    },
    senderText:{
        color:'#fff',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15,
    },
    sender:{
        padding:15,
        backgroundColor:'#2B6BE6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'

    },
    senderName:{
      left:10,
      paddingRight:10,
      fontSize:10,
      color:'#fff'
    },
    safeCotainer:{
       flex:1,

    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,

    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#E6E6E6',
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius: 30
        
 },
recieverText:{

},
senderText:{

},

});

//make this component available to the app
export default ChatScreen;
