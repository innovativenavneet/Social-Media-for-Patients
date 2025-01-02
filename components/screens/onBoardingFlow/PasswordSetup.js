import React, { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import SignInButton from '../../widgets/Buttons/signInButton';

const { width, height } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);


export default function PasswordSetup() {
    const navigation = useNavigation();
    const progress = useSharedValue(0)

    const animatedTickProps = useAnimatedProps(() => ({
      strokeDashoffset: 200 - (200 * progress.value),
    }));

    useEffect(() => {
      const interval = setInterval(() => {
        
        progress.value = 0;
        progress.value = withTiming(1, {
          duration: 2000,
          easing: Easing.out(Easing.exp),
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [progress]);

    const handleSignIn =()=>{
      navigation.navigate('WelcomeBackpage');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Password Setup Successful
      </Text>
      <View style={styles.circleContainer}>
        <Svg width={221} height={221} viewBox="0 0 250 250">
          <AnimatedCircle
            cx={125}
            cy={125}
            r={110}
            fill="#65FFB2"
          />
          <AnimatedPath
            d="M80 130l30 30 65-65"
            stroke="#FFF"
            strokeWidth={15}
              fill="#65FFB2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            animatedProps={animatedTickProps}
          />
        </Svg>
      </View>
      <SignInButton onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1E1FF',
    width: width * 1,
    height: height * 1,
  },
  title: {
    padding: 20,
    fontSize: 20,
    fontFamily:'Poppins-SemiBold',
    color: '#0D66FF',
    marginTop: -90,
    marginBottom: 70,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    width: 250,
    height: 250,
  },
  tickImage: {
    width: 150,
    height: 150,
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 90,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
  },
});
