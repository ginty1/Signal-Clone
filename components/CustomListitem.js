//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
// create a component
const CustomListItem = () => {
    return (
        <ListItem style={styles.container}>
            <Avatar
            rounded
            source={{
                uri:
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
            />

            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'800'}}>
                    YouTube Chat
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                    This is a test subtitle
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
