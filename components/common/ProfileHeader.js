import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function ProfileHeader({ title }) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handleChange = ({ window }) => setScreenWidth(window.width);
    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleMessageClick = () => {
    console.log("Message clicked");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  return (
    <View style={[styles.header, { width: screenWidth }]}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/Logo/logo.png')} />
      </View>
      <Text style={styles.feedText}>{title}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={handleMessageClick}>
          <Image style={styles.icon} source={require('../../assets/ProfileFeed/HeaderProfile/chat.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotificationClick}>
          <Image style={styles.icon2} source={require('../../assets/ProfileFeed/HeaderProfile/notification.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    // borderBottomWidth: 1,
    borderBottomColor: '#ddd',
   
    
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  feedText: {
    paddingTop:5,
    fontSize: 14,
    color: 'black',
   fontFamily:'Poppins-SemiBold',
  },
  rightIcons: {
    flexDirection: 'row',
    gap:24,
   
  },
  icon: {
    width: 20.45,
    height: 20,
  },
  icon2: {
    width:17.33,
    height: 20,
 
  },
});
