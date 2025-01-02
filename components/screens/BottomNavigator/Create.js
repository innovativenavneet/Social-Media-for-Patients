import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import PostButton from '../../widgets/Buttons/postButton';
import { launchImageLibrary } from "react-native-image-picker";
import CreateHeader from '../../common/CreateHeader';
import { useNavigation } from '@react-navigation/native';
import { add_user_post_information } from '../../API/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [tags, setTags] = useState(['Post', 'Story', 'Health Action', 'Environmental Triggers']);
  const [selectedTag, setSelectedTag] = useState('Post');
  const [username, setUsername] = useState('Username');
  const [template, setTemplate] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [media, setMedia] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [loader, setLoader] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [post_Video, Set_post_Video] = useState("");


  

  const saveMediaToStorage = async () => {
    try {
      const mediaData = JSON.stringify(media);
      await AsyncStorage.setItem('selected_media', mediaData);
      console.log('Media saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving media to AsyncStorage:', error);
    }
  };


  

  const togglePrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handleTemplateSelection = () => {

    console.log("template clicked");
  };

  const user_post_information = async () => {
    setLoader(true);
    // retriving tokn

    try {
      // const login_token = await AsyncStorage.getItem('login_token');
      const user_token = await AsyncStorage.getItem("user_token");
      const storage_data = await AsyncStorage.getItem("google_details");
      const storage_data_json = JSON.parse(storage_data);
      // setting key values to formdata
      const form_data = new FormData();

      form_data.append("user_token", user_token);
      console.log("Description before sending:", description);

      // form_data.append('login_token', login_token);
      form_data.append("media_type",  post_Video ? 'video' : 'photo');
      console.log("post_video_url", post_Video);
      form_data.append("private_post", isPrivate ? 'true' : 'false');
      form_data.append("post_template", template);
      form_data.append("post_description", description);


      // Assuming media is an array of File objects
      media.forEach((item, index) => {
        if (item.type === 'video') {
          form_data.append(`post_video_url`, {
            uri: item.uri,
            type: item.type,
            name: `video-${index}.mp4`,
          });
        } else {
          form_data.append(
            `post_image_urls`,
            `data:${item.type};base64,${item.base64}`
          );
        }
      });
      console.log('form data', form_data);

      const user_post_information_response = await add_user_post_information(
        form_data
      );


      console.log('API response:', user_post_information_response);


      if (user_post_information_response?.data?.status) {
        console.log("Post successful, navigating to FirstFeed");
        
        const newPost = user_post_information_response.data.post;
        navigation.navigate("FirstFeed",  { refresh: true })

      } else {
        console.error('Post failed:', user_post_information_response?.data?.error);
        setError(user_post_information_response?.data?.error);
      }
    } catch (error) {
      console.error('API call failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'An unknown error occurred');
    }
    finally {
      setLoader(false);
    }
  };

  const handleMediaUpload = async () => {
    const options = {
      mediaType: 'mixed',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,

    };
    
    try {
      const response = await new Promise((resolve, reject) => {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User didnt select to post');
            resolve(null);
          } else if (response.errorCode) {
            console.log('CreatePost Error: ', response.errorCode);
            reject(response.errorCode);
          } else {
            resolve(response);
          }
        });
      });
      if (response && response.assets && response.assets.length > 0) {

        const mediaType = response.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type,
          base64: asset.base64,
        }));
        setMedia((prevMedia) => [...prevMedia, ...mediaType]);
        setIsPhotoSelected(true);
        await saveMediaToStorage();

        if (response.assets[0].type === 'video') {
          const videoUri = response.assets[0].uri;
          const videoDuration = await getVideoDuration(videoUri);
          console.log('Selected video URI:', videoUri);
          
          if (videoDuration > 60) {
            Alert.alert("Video too long", "Please select a video up to 60 seconds.");
            return;
          }
          Set_post_Video(videoUri);
          console.log("VIDEO:",videoUri);
        }

     
      }
    } catch (error) {
      console.error('Error picking media: ', error);
    }
  };

const getVideoDuration = (uri) => {
    return new Promise((resolve, reject) => {
      Video.getDuration(uri, (error, duration) => {
        if (error) {
          reject(error);
        } else {
          resolve(duration);
        }
      });
    });
  };

  const handleRemoveImage = (index) => {
    Alert.alert(
      'Remove',
      'Are you sure you want to remove?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            setMedia(media.filter((_, i) => i !== index));
            if (media.length <= 1) {
              setIsPhotoSelected(false);
            }
            saveMediaToStorage();
          }
        },
      ],
      { cancelable: true }
    );
  };

  const handlePostAndSubmit = async () => {
    await user_post_information();
   // handlePost();
  };
  


  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.tagsContainer} showsHorizontalScrollIndicator={false}>
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tag, selectedTag === tag && styles.selectedTag]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.usernameContainer}>
          <View style={styles.userSec}>
            <View style={styles.usernameSection}>
              <Image style={styles.profileImage} source={require('../../../assets/ProfileFeed/CreatePost/Profile.png')} />
            
              <Text style={styles.username}>{username}</Text>
              <View style={styles.reversingContainer}>
                <Image style={styles.reversing} source={require('../../../assets/ProfileFeed/CreatePost/Reversing.png')} />
              
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.privateButton} onPress={togglePrivate}>
            <Text style={styles.privateButtonText}>{isPrivate ? 'Private Post' : 'Public Post'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.templateButton} onPress={handleTemplateSelection}>
          <Text style={styles.templateButtonText}>Choose from template</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.postInput}
          placeholder={"Are you Nimbo today? What do you want to talk about?\nSupplements, treatments, bio/hacks, tests, movement, self-care, research..."}
          multiline
          onChangeText={(text) => {
            setDescription(text);

            setIsTyping(text.length > 0)
          }}
          onBlur={() => setIsTyping(false)}
          value={description}
        />

        <View style={styles.mediaContainer}>
        <TouchableOpacity style={styles.mediaUpload} onPress={handleMediaUpload}>
            <Image style={styles.media} source={require('../../../assets/ProfileFeed/CreatePost/ProfileFrame.png')} />
          </TouchableOpacity>
          {media.map((item, index) => (
            <View key={index} style={styles.mediaWrapper}>
            <TouchableOpacity key={index} onPress={handleMediaUpload} onLongPress={() => handleRemoveImage(index)}>
              {item.type === 'video' ? (
                <Video
                  style={styles.video}
                  source={{ uri: item}}
                  resizeMode="cover"  
                  controls={true}
                />
              ) : (
                <Image style={styles.media} source={item} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => handleRemoveImage(index)}>
                <Icon name="close-circle-outline" size={18} color="#4F8EF7" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
       
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PostButton onPress={handlePostAndSubmit} isTyping={isTyping} isPhotoSelected={isPhotoSelected} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 240,
    backgroundColor: '#F7F7F7',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: 5,
  },
  tag: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    margin: 3,
  },
  selectedTag: {
    borderColor: '#007bff',
    borderWidth: 1.5,
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#7E7E7E',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  userSec: {
    flexDirection: 'row',
  },
  usernameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  reversingContainer: {
    marginLeft: -85,
  },
  reversing: {
    marginTop: 30,
    width: 75,
    height: 20,
    marginRight: 40,
    marginLeft: 20,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 10,
  },
  privateButton: {
    height: 32,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#007bff',
  },
  privateButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#007bff',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  templateButton: {
    backgroundColor: 'white',
    padding: 3,
    height: 35,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1.3,
    marginBottom: 20,
  },
  templateButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#7E7E7E',
    fontSize: 14,
  },
  postInput: {
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    textAlignVertical: 'top',
    height: 134,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  mediaWrapper: {
    position: 'relative',
   
  },
  media: {
    width: 100,
    height: 100,
    margin: 5,
  },
  deleteIcon: {
    position: 'absolute',
    right: -12,
    top:-8,
    // backgroundColor: '#fff',
    borderRadius: 15,
    padding: 3,
  },
  buttonContainer:{
    position:'absolute',
    bottom: 50,
    left:5,
    right: 5,
  },
  video: {
    width:'100%',
    height:'200',
  },
});



export default CreatePostScreen;
