import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image ,Dimensions, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GetStartedButton from '../../widgets/Buttons/GetStartedButton';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import NextButton from '../../widgets/Buttons/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const WelcomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();
  const [loader, set_loader] = useState(true)
  const checkNavigation = async() => {

    const goal_id =  await AsyncStorage.getItem("goal_id");
    const ProfileInformation3 =  await AsyncStorage.getItem("ProfileInformation3");
    const ProfileInformation4 =  await AsyncStorage.getItem("ProfileInformation4");
    const ProfileInformation5 =  await AsyncStorage.getItem("ProfileInformation5");
    const profile_setup =  await AsyncStorage.getItem("profile_setup");
    const welcome_scroll =  await AsyncStorage.getItem("welcome_scroll");
    console.log(goal_id)
    if(ProfileInformation5){
      navigation.navigate('Navigation2', { screen: 'FirstFeed' });
    }else{
      if(ProfileInformation4){
        navigation.navigate('ProfileInformation5');
      }else{
        if(ProfileInformation3){
          navigation.navigate('ProfileInformation4');
        }else{
          if(profile_setup){
            navigation.navigate('ProfileInformation3');
          }else{
            if(goal_id){
              navigation.navigate('ProfileSetup');
            }else{
              navigation.navigate('Profile');
            }
            // if(welcome_scroll){
             
            // }
          }
          
        }
        
      }
    
    }
   
    set_loader(false)
  };
  useEffect(() => {
    checkNavigation()
  },[])
  const handleNext = async() => {

    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    } else {
      await AsyncStorage.setItem('welcome_scroll', 'active');
      navigation.navigate('Profile');
    }
  };


  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPanGestureEvent = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50) {
        // Swiped left
        handleNext();
      } else if (nativeEvent.translationX > 50) {
        // Swiped right
        handlePrevious();
      }
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={onPanGestureEvent}>
      <View style={styles.container}>
        {loader ? <>
          <ActivityIndicator style={styles.actiivity_loader} size="large" color="#0000ff" />
        </> : <>
        {currentPage === 1 && (
          <View style={styles.content1}>
            <Text style={styles.heading}>Welcome! {'\n'}</Text>
            <Text style={styles.subHeading}>Want to find health</Text>
            <Text style={styles.label}>solutions?</Text>
          </View>
        )}
        {currentPage === 2 && (
          <View style={styles.content2}>
            <Text style={styles.heading}>Connect with other</Text>
            <Text style={styles.subHeading}>Nimbos on the app</Text>
          </View>
        )}
        {currentPage === 3 && (
          <View style={styles.content3}>
            <Text style={styles.heading}>Use our free data</Text>
            <Text style={styles.subHeading}>extraction tool to store</Text>
            <Text style={styles.label}>your medical test and</Text>
            <Text style={styles.label2}>track your progress</Text>
          </View>
        )}
        <Image
          source={
            currentPage === 1
              ? require('../../../assets/Slider/slider1.png')
              : currentPage === 2
              ? require('../../../assets/Slider/slider2.png')
              : require('../../../assets/Slider/slider3.png')
          }
          style={styles.slider}
        />
      </>}
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 88,
    paddingHorizontal: 20,
    backgroundColor: '#F6F5F2',
    width: width * 1,
    height: height * 1,
  },
  content1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  content2: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 139,
    marginTop: 300,
  },
  content3: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignSelf: 'stretch',
    width:290,
    height:152,
    paddingTop:38,
  },
  heading: {
    fontSize: 24,
    fontFamily:'Poppins-SemiBold',
    // fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#4a4a4a',
  },
  subHeading: {
    fontSize: 24,
    fontFamily:'Poppins-SemiBold',
    // fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#4a4a4a',
  },
  label: {
    fontSize: 24,
    fontFamily:'Poppins-SemiBold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#4a4a4a',
  },
  label2: {
    fontSize: 24,
    fontFamily:'Poppins-SemiBold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#4a4a4a',
  },
  slider: {
    width: '25%',
    height: 170,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 12, 
  },

});

export default WelcomePage;
