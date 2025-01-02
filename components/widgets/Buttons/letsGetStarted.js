import React from 'react'
import { View,TouchableOpacity,StyleSheet,Text } from 'react-native'

function StartedButton({ onPress }) {
  return (
    <View style={styles.container}>


<TouchableOpacity style={[styles.button, styles.nextButton]} onPress={onPress}>
   <Text style={styles.buttonText}>let's get started</Text>
            </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 70,
        left: 14,
        right: 14,
      },
 
  button: {
    backgroundColor: '#007bff',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  
  buttonText: {
    fontFamily:'Poppins-Regular',
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007bff',
    position: 'absolute',
    bottom: 13,
    // left: 16,
    // right: 1,
  },
});
export default StartedButton;
