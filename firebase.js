import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";
// import app from'@react-native-firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyADv_jlrLoo7XZ_Dn_Mw28n3c_1am7v24U",
    authDomain: "signal-1e38a.firebaseapp.com",
    projectId: "signal-1e38a",
    storageBucket: "signal-1e38a.appspot.com",
    messagingSenderId: "577966503793",
    appId: "1:577966503793:web:e6d6015f2c58f86bd828d0"
  };

  let app;
  if (firebase.apps.length===0){
      app=firebase.initializeApp(firebaseConfig);
  }else{
    app=firebase.app();
  }

  const db=app.firestore();
  const auth=firebase.auth();
  export {db,auth};
  