import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Feed from './FeedView';
import Map from '../screens/BottomNavigator/Map';
import Bubble from '../screens/BottomNavigator/Bubble';
import Group from '../screens/BottomNavigator/Group';
import { ScrollView } from 'react-native-gesture-handler';


export default function ProfileNavigation() {
    const [currentTab, setCurrentTab] = useState('Community');

    const routes = [
        { name: 'Community', activeIcon: require('../../assets/MyProfile/ProfileNavigation/communityActive.png'), inactiveIcon: require('../../assets/MyProfile/ProfileNavigation/community.png') },
        { name: 'Map', activeIcon: require('../../assets/MyProfile/ProfileNavigation/MapActive.png'), inactiveIcon: require('../../assets/MyProfile/ProfileNavigation/Map.png') },
        { name: 'Bubble', activeIcon: require('../../assets/MyProfile/ProfileNavigation/BulbActive.png'), inactiveIcon: require('../../assets/MyProfile/ProfileNavigation/Bulb.png') },
        { name: 'Group', activeIcon: require('../../assets/MyProfile/ProfileNavigation/GroupActive.png'), inactiveIcon: require('../../assets/MyProfile/ProfileNavigation/Group.png') },
    ];

    const handlePress = (routeName) => {
        setCurrentTab(routeName);
    };

    const renderContent = () => {
        switch (currentTab) {
            case 'Community':
                return <Feed />;
            case 'Map':
                return <Map />; 
            case 'Bubble':
                return <Bubble />;
            case 'Group':
                return <Group />; 
            default:
                return <Feed />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.navigationContainer}>
                {routes.map(route => {
                    const isFocused = currentTab === route.name;
                    return (
                        <TouchableOpacity key={route.name} onPress={() => handlePress(route.name)}>
                            <Image source={isFocused ? route.activeIcon : route.inactiveIcon} style={styles.icon} />
                        </TouchableOpacity>
                    );
                })}
            </View>
            <ScrollView style={styles.contentContainer}>
                {renderContent()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    icon: {
        width: 24,
        height: 24,
    },
    contentContainer: {
        flex: 1,
    },
});
