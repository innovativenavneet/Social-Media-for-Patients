import React from 'react'
import { View,TouchableOpacity,StyleSheet,Text } from 'react-native'

function AlreadyButton({ onPress }) {
  return (
    <View style={styles.container}>


<TouchableOpacity style={[styles.button, styles.nextButton]} onPress={onPress}>
   <Text style={styles.buttonText}>I already have an account</Text>
            </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 14,
    right: 14,
  },
  button: {
    backgroundColor: 'white', // Change background color to white
    borderColor: '#007bff',
    borderWidth:2,
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily:'Poppins-Regular',
    color: '#007bff',
    fontSize: 16,
  },
  nextButton: {
    borderColor: '#007bff',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 13,
    // left: 16,
    // right: 1,
  },
});
export default AlreadyButton;
