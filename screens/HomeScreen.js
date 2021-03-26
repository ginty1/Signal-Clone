//import liraries
import React, { useLayoutEffect,useState,useEffect } from 'react';
import {Avatar} from 'react-native-elements';
import { SafeAreaView, View, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import CustomListItem from '../components/CustomListitem'
import {auth,db} from '../firebase'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
// create a component


const HomeScreen = ({navigation}) => {
const [chats, setChats] = useState([])

//signOut from firebase
   const signOut=()=>{
       auth
       .signOut()
       //getting the result
       .then(()=>{
           navigation.replace('LoginScreen')
       })
   }

         //retriving data from firestore db
  useEffect(() => {
             const unsubscribe=db.collection('chats').onSnapshot(snapsot=>{
                 setChats(snapsot.docs.map(doc=>({
                               id: doc.id,
                               data: doc.data(),
                 })));
             });
             return unsubscribe;
         }, [])


       useLayoutEffect(() => {
           navigation.setOptions({
              title:'Signal',
                headerStyle:{backgroundColor:'#fff'},
                headerTitleStyle:{color:'black'},
                headerTintColor:'black',
                headerLeft:()=>(
                    <View style={{marginLeft:20}}>
                     <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                     <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                     </TouchableOpacity>

                    </View>
                ),
                headerRight:()=>(
                    <View style={{flexDirection:'row',
                                  justifyContent:'center',
                                   width:80,
                                   marginRight:20}}>
                     <TouchableOpacity activeOpacity={0.5}>
                       <AntDesign name="camerao" size={24} color='black'/>
                     </TouchableOpacity>
                     <TouchableOpacity 
                     activeOpacity={0.5}
                      onPress={()=> navigation.navigate('AddChat')}>
                       <SimpleLineIcons name="pencil" size={24} color='black'/>
                     </TouchableOpacity>
                    </View>
                )
            
                });
               
            }, [navigation])
        const enterChat=(id,chatName)=>{
            navigation.navigate('ChatScreen',{
                id,
                chatName,
            })
        }
    

    return (
        <SafeAreaView>
          <ScrollView style={styles.container}>
              {chats.map(({id, data:{chatName}})=>(
                  <CustomListItem
                   key={id} 
                   id={id} 
                   chatName={chatName}
                   enterChat={enterChat}/>        

              ))}
          </ScrollView>
          </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
         height:'100%',
    },
});

//make this component available to the app
export default HomeScreen;
