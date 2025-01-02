import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const PostButton = ({ onPress, isTyping, isPhotoSelected }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (onPress) {
      onPress();
    }
  };

  useEffect(() => {
    if (!isTyping && !isPhotoSelected) {
      setIsPressed(false);
    }
  }, [isTyping, isPhotoSelected]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          { backgroundColor: (isTyping || isPhotoSelected) ? '#0D66FF' : '#9EC2FF' },
        ]}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 19,
    left: 14,
    right: 14,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 16,
  },
});

export default PostButton;
