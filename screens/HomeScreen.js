//import liraries
import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import CustomListItem from '../components/CustomListitem'
// create a component
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
         <CustomListItem/>        
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {

    },
});

//make this component available to the app
export default HomeScreen;
