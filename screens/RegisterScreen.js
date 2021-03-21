//import liraries
import { LogBox } from 'react-native';
import React, {useLayoutEffect,useState } from 'react';
import { StatusBar} from 'expo-status-bar'
import{Button,Input,Image,Text}from 'react-native-elements'
import { View,StyleSheet,KeyboardAvoidingView } from 'react-native';
import {auth}from '../firebase'

// create a component
LogBox.ignoreLogs(['Setting a timer']);
const RegisterScreen= ({navigation}) => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[imageUrl,setImageUrl]=useState('')

    useLayoutEffect(()=>{
         navigation.setOptions({
           headerBackTitle:'ABCS'
         })
    },[navigation])

    const register=()=>{
      auth.createUserWithEmailAndPassword(email,password)
      
       //Getting back the authenticated user
      .then((authUser)=>{
        //updating the user authenticated user profile
        authUser.user.updateProfile(
          { displayName:name,
            photoURL:imageUrl ||
             'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png'
          }
        )
       
      })
      .catch(error=>alert(error.message));

    };

    return (
        <View KeyboardAvoidingView behavior='padding' style={styles.container}>
          <StatusBar style='light'/>
           <Text h3 style={{marginBottom:50}}>Create a Signal account</Text>
            
            <View style={styles.inputContainer}>
              <Input placeholder='Enter name'
               autoFocus type='text' value={name}
                onChangeText={name=>setName(name)} />
              <Input placeholder='Email' 
               type='text' value={email}
                onChangeText={email=>setEmail(email)} />
              <Input placeholder='Enter Password' 
              type='text' secureTextEntry value={password} 
              onChangeText={password=>setPassword(password)} />
              <Input placeholder='Image Url' 
              type='text' value={imageUrl} 
              onChangeText={imageUrl=>setImageUrl(imageUrl)}
              onSubmitEditing={register} />
            </View>

            <Button title='Register' raised onPress={register} style={styles.button}/>
            <View style={{height:100}}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
         alignItems:'center',
         justifyContent:'center',
         padding:10,
    },
    button:{
     width:300,
     marginTop:10,
    },
    inputContainer:{
        width:300,
    }
});

//make this component available to the app
export default RegisterScreen;
