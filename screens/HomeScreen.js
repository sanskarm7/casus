import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { user, handleAuthentication } from './LoginScreen';
// import { initializeApp } from '@firebase/app';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// import LoginScreen from './screens/LoginScreen';

const HomeScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
});