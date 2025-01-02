import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function ProfileFooter() {
  const [currentTab, setCurrentTab] = useState('FirstFeed');
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const navigation = useNavigation();

  useEffect(() => {
    const handleChange = ({ window }) => setScreenWidth(window.width);
    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const routes = [
    { name: 'FirstFeed', activeIcon: require('../../assets/ProfileFeed/FooterProfile/HomeActive.png'), inactiveIcon: require('../../assets/ProfileFeed/FooterProfile/FooterHome.png') },
    { name: 'Explore', activeIcon: require('../../assets/ProfileFeed/FooterProfile/FooterCommunityActive.png'), inactiveIcon: require('../../assets/ProfileFeed/FooterProfile/FooterCommunity.png') },
    { name: 'Create', activeIcon: require('../../assets/ProfileFeed/FooterProfile/PlusButtonActive.png'), inactiveIcon: require('../../assets/ProfileFeed/FooterProfile/PlusButton.png') },
    { name: 'Profile', activeIcon: require('../../assets/ProfileFeed/FooterProfile/ProfileActive.png'), inactiveIcon: require('../../assets/ProfileFeed/FooterProfile/FooterProfile.png') },
  ];

  const handlePress = (routeName) => {
    setCurrentTab(routeName);
    console.log((routeName)+ "clicked");
    navigation.navigate(routeName);
  };

  return (
    <View style={[styles.footer, { width: screenWidth }]}>
      {routes.map((route) => {
        const isFocused = currentTab === route.name;
        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => handlePress(route.name)}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <Image
              style={styles.icon}
              source={isFocused ? route.activeIcon : route.inactiveIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#F7F7F7',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
