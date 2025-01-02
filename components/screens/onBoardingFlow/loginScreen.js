import React from 'react';
import { View, Image, StyleSheet, Text, Linking, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StartedButton from '../../widgets/Buttons/letsGetStarted';
import AlreadyButton from '../../widgets/Buttons/alreadyAccount';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('AuthenticationScreen'); 
  };

  const handleAlreadyAccount = () => {
    navigation.navigate('WelcomeBackpage');
  };

  const onTermsofUsePressed = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/Logo/main.png')}
          style={[styles.logo, { width: width * 0.8, height: width * 0.235 }]}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <StartedButton onPress={handleGetStarted} />
        <View style={styles.gap}></View>
        <AlreadyButton onPress={handleAlreadyAccount} />
      </View>
      
      <View style={styles.privacyContainer}>
        <Text style={styles.parentText}>
          By continuing, you agree to Nimbo's{'\n'}
          <Text
            style={styles.linkText}
            onPress={() => onTermsofUsePressed('https://www.example.com/fake-terms-and-conditions')}
          >
            Terms & Conditions
          </Text>
          {' '}and{' '}
          <Text
            style={styles.linkText}
            onPress={() => onTermsofUsePressed('https://www.example.com/fake-privacy-policy')}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    marginTop: 100,
  },
  logo: {
    resizeMode: 'contain',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    
  },
  gap: {
    height: 12, 
  },
  privacyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:-20,
  },
  linkText: {
    color: '#7E7E7E',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  parentText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#7E7E7E',
    fontSize: 10,
    lineHeight: 20,
  },
});

export default LoginScreen;



