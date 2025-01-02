import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';

function CreateMyProfileButton({ onPress, isSelected }) {
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
    isSelected && styles.buttonSelected,
    isPressed && styles.buttonPressed,
    isHovered && !isPressed && styles.buttonHovered,
  ];

  const textStyles = [
    styles.buttonText,
    isPressed && styles.buttonTextPressed,
    isHovered && !isPressed && styles.buttonTextHovered,
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
          <Text style={textStyles}>Create my Profile</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonSelected: {
    backgroundColor: '#0D66FF',
    borderColor: '#0D66FF',
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
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
    borderColor: '#9EC2FF',
    backgroundColor: '#9EC2FF',
  },
  buttonTextHovered: {
    color: '#000',
  },
});

export default CreateMyProfileButton;
