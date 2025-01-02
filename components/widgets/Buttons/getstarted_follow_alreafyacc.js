
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';

const Button = ({ title, onPress, style, textStyle, type = 'primary' }) => {
  const { width } = useWindowDimensions();
  
  const buttonStyles = [styles.button, style];
  const textStyles = [styles.buttonText, textStyle];

  if (type === 'follow') {
    buttonStyles.push(styles.followButton);
    textStyles.push(styles.followButtonText);
  } else if (type === 'getStarted') {
    buttonStyles.push(styles.getStartedButton);
    textStyles.push(styles.getStartedButtonText);
  } else if (type === 'account') {
    buttonStyles.push(styles.accountButton);
    textStyles.push(styles.accountButtonText);
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 14,
    right: 14,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  followButton: {
    backgroundColor: '#0D66FF',
    borderWidth: 1.5,
    borderColor: '#0D66FF',
    // width: 360,
    // height: 50,
    borderRadius: 30,
  },
  followButtonText: {
    color: '#FFFFFF',
  },
  getStartedButton: {
    backgroundColor: '#0D66FF',
    width: 360,
    height: 50,
    borderRadius: 30,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
  },
  accountButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0D66FF',
    width: 360,
    height: 50,
    borderRadius: 30,
  },
  accountButtonText: {
    color: '#0D66FF',
  },
});

export default Button;
