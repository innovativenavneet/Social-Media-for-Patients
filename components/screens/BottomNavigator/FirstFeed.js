import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import FeedView from '../../../components/common/FeedView';
import { CREATE_STORY_POST } from '../../API/apis';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

export default function FirstFeed() {
  const [showSplash, setShowSplash] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleImagePress = () => {
    setModalVisible(true); 
  };

  const handleCloseModal = () => {
    setModalVisible(false); 
  };
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const CREATE_POST = async () => {
    if (!profileImage) {
      console.log('No image selected');
      return;
    }
    setLoader(true);

    try {
      const user_token = await AsyncStorage.getItem('user_token');

      const formData = new FormData();
      formData.append('user_token', user_token);
      formData.append('story_post_url', profileImage);

      const response = await CREATE_STORY_POST(formData);

      console.log(response);
      if (response?.data?.status) {
        console.log('Story Post created successfully');
        setSelectedImage(profileImage);
        Alert.alert('Success', 'Story uploaded successfully');
       
      } else {
        setError(response?.data?.error);
        Alert.alert('Error', response?.data?.error || 'Failed to upload story');
      }
    } catch (error) {
      console.error('Error creating post: ', error);
      setError(error);
      Alert.alert('Error', error.message || 'Failed to upload story');
    } finally {
      setLoader(false);
    }
  };

  const handleChangePicture = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
      includeBase64: true,
    };
  
    try {
      const response = await new Promise((resolve, reject) => {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
            resolve(null);
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
            reject(response.errorCode);
          } else {
            resolve(response);
          }
        });
      });
  
      if (response && response.assets && response.assets.length > 0) {
        const imageBase64 =
          'data:' + response.assets[0].type + ';base64,' + response.assets[0].base64;
        setProfileImage(imageBase64);
  
        await CREATE_POST(imageBase64);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.storyContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} style={styles.story}>
                <ImageBackground
                  source={require('../../../assets/ProfileFeed/Feed/UserStoryBackground.png')}
                  style={styles.backgroundImage}
                >
                   <TouchableOpacity onPress={index === 0 && profileImage ? handleImagePress : null}>
                    <ImageBackground
                      source={index === 0 && profileImage ? { uri: profileImage } : require('../../../assets/ProfileFeed/Feed/Profile.png')}
                      style={styles.storyImage}
                    />
                  </TouchableOpacity>
              
                  {index === 0 && (
                      <TouchableOpacity onPress={handleChangePicture}>
                        <View style={styles.plusContainer}>
                          <View style={styles.circleBackground}></View>
                          <Text style={styles.plusText}>+</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                </ImageBackground>
                <Text style={styles.storyText}>Username</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {Array.from({ length: 1 }).map((_, index) => (
            <FeedView key={index} image={selectedImage}  />
          ))}
        </ScrollView>
        {showSplash && (
          <View style={styles.splashContainer}>
            <Image
              source={require('../../../assets/ProfileFeed/Feed/SplashBanner.png')}
              style={styles.splashImage}
            />
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: profileImage }} style={styles.modalImage} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F6F5F2',
    },
    storyContainer: {
      flexDirection: 'row',
      paddingVertical: 2,
      backgroundColor: '#F6F5F2',
      marginTop:20,
    },
    story: {
      alignItems: 'center',
      marginRight: 10,
      position: 'relative',
      paddingBottom:10, 
    },
    backgroundImage: {
      width: width * 0.2,
      height: width * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    storyImage: {
      width: width * 0.17,
      height: width * 0.17,
      borderRadius: (width * 0.17) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', 
    },
    image: {
      width: '100%', 
      height: '100%', 
      resizeMode: 'cover', 
    },
    plusContainer: {
      position: 'absolute',
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0D66FF',
      borderRadius: 12,
    top: -20,
      right: -30,
    },
    plusText: {
      color: '#fff',
      fontSize: 20,
      textAlignVertical: 'center',
      top: -4,
    },
    circleBackground: {
      position: 'absolute',
      width: 22,
      height: 22,
      backgroundColor: '#007bff',
      borderRadius: 16,
      top: 0,
      left: 0,
    },
    storyText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      marginTop: 5,
    },
    scrollContainer: {
      paddingVertical: 0,
    },
    splashContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: height * 0.04,
      width: width * 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(246, 245, 242, 0.8)',
      zIndex: 1,
    },
    splashImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });