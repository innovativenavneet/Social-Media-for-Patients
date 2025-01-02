import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Linking, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateHeader() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const navigation = useNavigation();

  useEffect(() => {
    const handleChange = ({ window }) => setScreenWidth(window.width);
    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const Create = () => {
    
    navigation.navigate('SettingProfile');
  };

  return (
    <View style={[styles.header, { width: screenWidth }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.arrow} source={require('../../assets/Common/leftArrow.png')} />
      </TouchableOpacity>
      <Text style={styles.create} onPress={Create}>Create</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
   
   
  },
  arrow: {
    width: 17,
    height: 12.14,
    marginLeft: 12,
    paddingHorizontal:5,
    paddingVertical: 8.93,
  },
  create: {
    color: '#404040',
    fontSize: 14,
    fontFamily:'Poppins-SemiBold',
    marginRight: 164, 
  },
});
