import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import HomeScreen from './HomeScreen';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, collection, addDoc } from '@firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDBU9pkEt4r13KFmXsR95N0jhFPfWHt_h4",
  authDomain: "casus-9a7da.firebaseapp.com",
  projectId: "casus-9a7da",
  storageBucket: "casus-9a7da.appspot.com",
  messagingSenderId: "647491407812",
  appId: "1:647491407812:web:175b98c89baf017dfc1e91",
  measurementId: "G-3H2DQ0K82H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // get firestore instance

const AuthScreen = ({ email, setEmail, password, setPassword, name, setName, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
 
 
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
 
 
      {/* Render name input only during sign-up */}
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          autoCapitalize="none"
        />
      )}
 
 
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
 
 
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
 
 
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
 
 
    </View>
  );
 }
 
 
 export default App = () => {
  // State variables for email, password, name, user, and isLogin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true); // Default to login mode
 
 
  // Initialize Firebase app and authentication instance
  const auth = getAuth(app);
 
 
  // useEffect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
 
 
    return () => unsubscribe();
  }, [auth]);
 
 
  // handleAuthentication function to handle sign-up and sign-in
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up based on isLogin state
        if ( isLogin){
          // Sign in with email and password
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up with email, password, and name
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
 
 
          // Save user data into Firestore collection
          const userData = {
            email: email,
            username: name, // Include the user's name
            // Add additional user data as needed
          };
 
 
          const docRef = await addDoc(collection(db, 'users'), userData);
 
 
          console.log('User data saved with ID: ', docRef.id);
        }
      }
    } catch (error) {
      // Handle authentication errors
      if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        Alert.alert('Error', 'Invalid password. Password should be at least 6 characters.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };
 
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Render HomeScreen if user is authenticated, otherwise render AuthScreen */}
      {user ? (
        <HomeScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
 }
 

//TEMP PLZ CHANGE
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});