import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import FirstFeed from './FirstFeed';  
import Explore from './Explore';
import Create from './Create';
import Profile from './Profile';
import FeedView from '../../common/FeedView';
import ProfileFooter from '../../common/ProfileFooter'; 
import ProfileHeader from '../../common/ProfileHeader';  

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const getHeaderTitle = (routeName) => {
    switch (routeName) {
      case 'FirstFeed':
        return 'Feed';
      case 'Explore':
        return 'Explore';
      case 'Create':
        return 'Create';
      case 'Profile':
        return 'Profile';
      default:
        return 'App';
    }
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <ProfileFooter {...props} />} 
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        header: () => (
          <View>
            <ProfileHeader title={getHeaderTitle(route.name)} />
          </View>
        ),
      })}
    >
      <Tab.Screen name="FirstFeed" component={FirstFeed} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="FeedView" component={FeedView} />
      <Tab.Screen name="Profile" component={Profile} />
      
    </Tab.Navigator>
  );
};

export default AppNavigator;
