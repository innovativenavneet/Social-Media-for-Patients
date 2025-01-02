import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Linking, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const navigation = useNavigation();

  useEffect(() => {
    const handleChange = ({ window }) => setScreenWidth(window.width);
    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const skip = () => {
    
    navigation.navigate('SettingProfile');
  };

  return (
    <View style={[styles.header, { width: screenWidth }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.arrow} source={require('../../assets/Common/leftArrow.png')} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'white',
    height: 60,

   
  },
  arrow: {
    width: 17,
    height: 12.14,
    marginLeft: 12,
    paddingHorizontal:5,
    paddingVertical: 8.93,
  },
  skip: {
    color: 'black',
    fontSize: 14,
    fontFamily:'Poppins-Regular',

    marginRight: 20, 
  },
});
