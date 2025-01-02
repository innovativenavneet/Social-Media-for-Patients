import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, DevSettings } from 'react-native';


import ProfileNavigation from '../../../components/common/MyProfileNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();
  const logout = async() => {
     await AsyncStorage.removeItem('google_details');
        await AsyncStorage.removeItem('goal_id');
        await AsyncStorage.removeItem('profile_setup');
        await AsyncStorage.removeItem('user_token');
        RNRestart.Restart();
  }
  return (
    <>
      
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={require('../../../assets/ProfileFeed/Feed/Profile.png')}
          />
          <View style={styles.profileCount}>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>678</Text>
              <Text style={styles.countLabel}>Followers</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>684</Text>
              <Text style={styles.countLabel}>Following</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>7868</Text>
              <Text style={styles.countLabel}>Actions</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.title}>
            <Text style={styles.profileName}>Laura L.</Text>
            <Text style={styles.profileStatus}>Reversing</Text>
          </View>
          <Text style={styles.profileBio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Symptoms and Diagnoses</Text>
          <View style={styles.tagContainer}>
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Diagnosis.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Diagnosis1.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/symptoms.png')} />
            
          </View>
          <Text style={styles.moreText}>+ 10 more</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health actions by Laura</Text>
          <View style={styles.tagContainer}>
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Medication.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Diet.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Diet1.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Medication.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Diet.png')} />
            <Image style={styles.tileImage} source={require('../../../assets/MyProfile/Diet1.png')} />
          </View>
          <View style={styles.moreContainer}>
            <Text style={styles.moreText}>+10 more</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editProfileButton} onPress={logout}>
          <Text style={styles.editProfileButtonText}>Logout</Text>
        </TouchableOpacity>

        
        <ProfileNavigation />
      </ScrollView>
      {/* <Footer /> */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F5F2',
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between', 
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  profileCount: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countItem: {
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countLabel: {
    fontSize: 14,
    color: '#888',
  },
  profileInfo: {
    margin: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileStatus: {
    backgroundColor: '#AFDBF5',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    marginLeft: 10,
    color: '#fff',
  },
  profileBio: {
    color: '#777',
    marginTop: 10,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  tileImage: {
    width: '32%', 
    marginBottom: 5,
    borderRadius: 5,
    padding: 5,
  },
  moreContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  moreText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  editProfileButton: {
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: width * 0.03,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  editProfileButtonText: {
    color: 'black',
    fontWeight: '600',
  },
});


export default Profile;