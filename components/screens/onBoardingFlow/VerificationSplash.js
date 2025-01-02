import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = ({ route }) => {
  const navigation = useNavigation();
  const { message } = route.params;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Password', { email: 'user@example.com', action: 'signup' });
    }, 2000); // Show the splash screen for 2 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F2',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default SplashScreen;
