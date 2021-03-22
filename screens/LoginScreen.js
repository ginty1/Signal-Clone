//import liraries
import React, {useEffect,useState}from 'react';
import { View, Text, StyleSheet,KeyboardAvoidingView } from 'react-native';
import{Button,Input,Image}from 'react-native-elements'
import {StatusBar}from 'expo-status-bar'
import {auth}from '../firebase'



const LoginScreen = ({navigation}) => {
     const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');
         
         
         useEffect(() => {
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
               if(authUser){
                   navigation.replace('HomeScreen')
               }
            }) 
             return unsubscribe;
         }, [])



       const signIn=()=>{
    
               auth.signInWithEmailAndPassword(email,password).catch(error=>alert(error.massage))      
    
             }

    return (
        <View KeyboardAvoidingView behavior='padding' style={styles.container} >
            <StatusBar style='light'/>
            <Image
            source={{
                uri:'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png'
            }}
            style={{width:200, height:200}}/>

            <View style={styles.inputContainer}>
                <Input
                 placeholder='Email' 
                 autoFocus type='Email'
                  value={email}
                   onChangeText={email=>setEmail(email)}/>
                <Input 
                placeholder='Password' 
                secureTextEntry type='password'
                value={password} onChangeText={password=>setPassword(password)} onSubmitEditing={signIn}/>
            </View>

            <Button title='Login' onPress={signIn} containerStyle={styles.button}/>
            <Button title='Register' onPress={()=>navigation.push('RegisterScreen')} type='outline' containerStyle={styles.button}/>
                 
            <View style={{height:120}}/>
            </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputContainer:{
        width:300
          },
    button:{
        width:200,
        marginTop:10,
    },
    
});

//make this component available to the app
export default LoginScreen;
