//import liraries
import React, { useState,useEffect } from 'react';
import {StyleSheet } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import {db}from '../firebase'

// create a component
const CustomListItem = ({id,chatName,enterChat}) => {

    const [chatMessages, setChatMessages] = useState([]);

     useEffect(() => {
         const unsubscribe=db
         .collection('chats')
         .doc(id)
         .collection('massages')
         .orderBy('timestamp','desc')
         .onSnapshot((snapshot)=>
         setChatMessages(snapshot.docs.map((doc)=>doc.data())));
         return unsubscribe;
     });


    return (
        <ListItem key={id} onPress={()=>enterChat(id,chatName)} key={id} bottomDivider style={styles.container}>
            <Avatar
            rounded
            source={{
                uri:chatMessages?.[0]?.photoURL||
                 "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
            />

            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'800'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.massage}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

// define your styles
const styles = StyleSheet.create({
    
});

//make this component available to the app
export default CustomListItem;
