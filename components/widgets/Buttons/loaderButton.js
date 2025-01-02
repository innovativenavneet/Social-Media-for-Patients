import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet , ActivityIndicator, View} from 'react-native';

const LoaderButton = () => {
  

  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: "#0D66FF" },
      ]}
    >
             <ActivityIndicator size="small" color="#fff" />
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

export default LoaderButton;
