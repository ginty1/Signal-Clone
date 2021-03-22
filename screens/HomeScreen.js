//import liraries
import React, { useLayoutEffect } from 'react';
import {Avatar} from 'react-native-elements';
import { SafeAreaView, View, StyleSheet,TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListitem'
import {auth,db} from '../firebase'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
// create a component


const HomeScreen = ({navigation}) => {


//signOut from firebase
   const signOut=()=>{
       auth
       .signOut()
       //getting the result
       .then(()=>{
           navigation.replace('LoginScreen')
       })
   }

  
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
