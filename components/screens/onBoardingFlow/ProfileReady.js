import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import TakeMeToMyFeedButton from '../../widgets/Buttons/takeMeToMyFeed';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const { width, height } = Dimensions.get('window');


export default function ProfileReady() {
  const navigation = useNavigation();
  const progress = useSharedValue(0);
  const animationStarted = useSharedValue(false);
  

  const animatedTickProps = useAnimatedProps(() => ({
    strokeDashoffset: 200 - (200 * progress.value),
  }));

  useEffect(() => {
    if (!animationStarted.value) {
      animationStarted.value = true;
      progress.value = withTiming(1, {
        duration: 5000,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [progress, animationStarted]);

  const handleSignIn = () => {

    navigation.navigate('Navigation2', { screen: 'FirstFeed' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile is now ready</Text>
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
      <TakeMeToMyFeedButton onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1E1FF',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#0D66FF',
    marginTop: -90,
    marginBottom: 90,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
