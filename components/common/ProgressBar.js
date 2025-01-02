import React, { useRef, useState, useLayoutEffect } from 'react';
import { View, Animated, StyleSheet, PanResponder, Text, TouchableOpacity } from 'react-native';

const ProgressBar = ({ initialProgress = 0, onChange, set_index_value }) => {
  const [progress, setProgress] = useState(initialProgress);
  const [containerWidth, setContainerWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(initialProgress)).current;
  const containerRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { moveX } = gestureState;
      if (containerWidth > 0) {
        const newProgress = Math.max(0, Math.min(1, moveX / containerWidth));
        setProgress(newProgress);
        animatedValue.setValue(newProgress);
        onChange && onChange(newProgress); 
      }
    },
    onPanResponderRelease: () => {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    },
  });

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width) => {
        setContainerWidth(width);
      });
    }
  }, []);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const thumbLeftInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%' || '0%'],
    extrapolate: 'clamp',
  });

  const handleEmojiClick = (index) => {
    set_index_value(index)
    const newProgress = index / 4;
    setProgress(newProgress);
    animatedValue.setValue(newProgress);
    onChange && onChange(newProgress);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.labels}>
      {['😐', '😕', '😣', '😩', '😩'].map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmojiClick(index)}>
            <Text style={styles.label}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        ref={containerRef}
        style={styles.container}
        onLayout={() => {
          if (containerRef.current) {
            containerRef.current.measure((x, y, width) => {
              setContainerWidth(width);
            });
          }
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.progressBar}>
          <Animated.View style={[styles.fill, { width: widthInterpolated }]} />
          <Animated.View
            style={[
              styles.thumb,
              {
                left: thumbLeftInterpolated,
                transform: [{ translateX: -5 }],
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.descriptions}>
        <Text style={styles.description}>Hardly Notice It</Text>
        <Text style={[styles.description, { textAlign: 'right', alignSelf: 'flex-end' }]}>
          Can't do{'\n'}everyday activities
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    // padding: 10,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 13,
  },
  label: {
    fontSize: 18,
  },
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    overflow: 'visible',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius:12,
  },
  fill: {
    height: '100%',
    backgroundColor: '#FEFFB6',
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#48a0dc',
    top: -10,
  },
  descriptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    color: '#7E7E7E',
  },
});

export default ProgressBar;
