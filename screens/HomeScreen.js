//import liraries
import React, { useLayoutEffect } from 'react';
import {Avatar} from 'react-native-elements';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import CustomListItem from '../components/CustomListitem'
import {auth,db} from '../firebase'
// create a component


const HomeScreen = ({navigation}) => {
  
       useLayoutEffect(() => {
           navigation.setOptions({
              title:'Signal',
            headerStyle:{
                backgroundColor:'#fff'},
                headerTitleStyle:{color:'black'},
                headerTintColor:'black',
                headerLeft:()=>(
                    <View style={{marginLeft:20}}>
                     
                     <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>

                    </View>
                )
            
                });
               
            }, [])
    

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
