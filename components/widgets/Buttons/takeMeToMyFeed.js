import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';

function TakeMeToMyFeedButton({ onPress }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const buttonStyles = [
    styles.button,
    isPressed && styles.buttonPressed,
    isHovered && !isPressed && styles.buttonHovered, // Apply hover style if not pressed
  ];

  const textStyles = [
    styles.buttonText,
    isPressed && styles.buttonTextPressed,
    isHovered && !isPressed && styles.buttonTextHovered, // Apply hover text style if not pressed
  ];

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <View style={buttonStyles}>
          <Text style={textStyles}>Take me to my feed</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 19,
    left: 14,
    right: 14,
  },
  button: {
    backgroundColor: '#9EC2FF', 
    borderColor: '#9EC2FF', 
    borderWidth: 2, 
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff', // Default black text color
    fontSize: 14,
  },
  buttonPressed: {
    backgroundColor: '#0D66FF', 
    borderColor: '#0D66FF', 
  },
  buttonTextPressed: {
    color: '#fff', 
  },
  buttonHovered: {
    backgroundColor: '#9EC2FF', 
  },
  buttonTextHovered: {
    color: '#000', 
  },
});

export default TakeMeToMyFeedButton;
