//import liraries
import React, { useLayoutEffect,useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button,Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

// create a component
const AddChat = ({navigation}) => {
       const [input, setInput] = useState('')


   useLayoutEffect(() => {
          navigation.setOptions({
              title:'add a new chat',
              headerBackTitle:'Chats',
          })
   }, [navigation])

   const createChat=async()=>{
       await db
       .collection('chats')
       .add({
           chatName:input
       })
       .then(()=>{
           navigation.goBack();
       })
       .catch((errer)=>alert(error.massage))

   }



    return (
        <View style={styles.container}>
            <Input
             placeholder='Enter chat name'
             value={input}
             onChangeText={(text)=>setInput(text)}
             leftIcon={
                <Icon name='wechat' type="antdesign" size={24} color='black'/> }
             />

             <Button title='create a new chat' onPress={createChat}/>
        </View>

        
    );
};

// define your styles
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:30,
        height:'100%'
    }
    
});

//make this component available to the app
export default AddChat;
