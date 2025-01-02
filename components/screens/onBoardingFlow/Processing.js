
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2 * Math.PI * R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SettingProfile() {
  const progress = useSharedValue(0);
  const navigation = useNavigation();

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  useEffect(() => {
    progress.value = withTiming(1, { duration: 3000 });

    const timer = setTimeout(() => {
      navigation.navigate('ProfileReady');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation, progress]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting up your profile</Text>
      <Text style={styles.subtitle}>Please wait till we set up your profile</Text>
      <View style={styles.circleContainer}>
        <Svg width={300} height={300}>
          <Circle
            cx={150}
            cy={150}
            r={90}
            fill="#D1E1FF" 
          />
          <Circle
            cx={150}
            cy={150}
            r={100}
            stroke="#FFFFFF"
            strokeWidth={20}
            fill="none"
          />
          <Circle
            cx={150}
            cy={150}
            r={80}
            stroke="#FFFFFF"
            strokeWidth={60}
            fill="none"
          />
          <AnimatedCircle
            cx={150}
            cy={150}
            r={80}
            stroke="#FFFF00"
            strokeWidth={57}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1E1FF',
    width: width * 1,
    height: height * 1,
  },
  title: {
    fontSize: 20,
    fontFamily:'Poppins-SemiBold',
    color: '#0D66FF',
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 9,
  },
  subtitle: {
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    color: '#0D66FF',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

