import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, RefreshControl, Animated, Easing, ActivityIndicator, Modal} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { feed_post_list } from '../API/apis';
import CustomSlider from '../widgets/CustomSlider';
import ImageViewer from 'react-native-image-zoom-viewer';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');

export default function FeedView() {
    const navigation = useNavigation();

    const route = useRoute();
    const { refresh } = route.params || {};

    const [isExpanded, setIsExpanded] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [likes, setLikes] = useState(43);
    const [liked, setLiked] = useState(false);
    const [tag, setTag] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');

    const [user_feed_list, set_user_feed_list] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const hoverAnimation = useRef(new Animated.Value(0)).current;

    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [zoomImages, setZoomImages] = useState([]);

    const fetchPostData = async () => {
        try {
            const user_token = await AsyncStorage.getItem('user_token');
            const storage_data = await AsyncStorage.getItem("google_details");
            const storage_data_json = JSON.parse(storage_data);

            const form_data = new FormData();
            form_data.append("user_token", user_token);

            const add_post_response = await feed_post_list(form_data);
            console.log('API Response:', add_post_response.data);

            if (add_post_response?.data?.status) {
                console.log(add_post_response?.data?.user_feed_list);
                set_user_feed_list(add_post_response?.data?.user_feed_list);

            } else {

            }
        } catch (error) {

        }
    };

    // const follow_user = async (user_token, user_id, action) => {
    //     try {
    //         const form_data = new FormData();
    //         form_data.append("user_token", user_token);
    //         form_data.append("user_id", user_id);
    //         form_data.append("action", action); // 'follow' or 'unfollow'

    //         const response = await (form_data);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error following/unfollowing user:', error);
    //         return null;
    //     }
    // };

    useEffect(() => {
        if (refresh) {
            navigation.setParams({ refresh: false });
        } else {
            fetchPostData();
        }
    }, [refresh]);

    const handleFollow = async () => {
        console.log("Follow Clicked");
        // try {
        //     const user_token = await AsyncStorage.getItem('user_token');
        //     const action = isFollowing ? 'isfollowing' : 'follow';
        //     const response = await follow_user(user_token, user_id, action);

        //     if (response?.status) {
        //         setIsFollowing(!isFollowing);
        //     } else {

        //     }
        // } catch (error) {

        // }

    };

    const handleLikes = () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setIsPressed(!isPressed);
        setLiked(!liked);
    };

    const handleComments = () => {
        console.log("Comments Clicked");
        setShowCommentInput(!showCommentInput);
    };

    const handleShare = () => {
        console.log("Share Clicked");
    };

    const handleMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleOptions = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleTag = () => {
        console.log("Tag Clicked");
        setTag(!tag);
    };

    const wordCount = (str) => {
        return str.split(' ').filter(word => word !== '').length;
    };

    const truncateDescription = (description, limit) => {
        if (wordCount(description) > limit) {
            const words = description.split(' ');
            return `${words.slice(0, limit).join(' ')}...`;
        }
        return description;
    };

    const startHoverAnimation = () => {
        hoverAnimation.setValue(0);
        Animated.timing(hoverAnimation, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(hoverAnimation, {
                toValue: 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleRefresh = async () => {
        console.log('Refresh triggered');
        setRefreshing(true);
        startHoverAnimation();
        await fetchPostData();
        console.log('Refresh complete');
        setRefreshing(false);
    };


    const openZoomModal = (images) => {
        setZoomImages(images.map(url => ({ url })));
        setZoomModalVisible(true);
    };

    const closeZoomModal = () => {
        setZoomModalVisible(false);
        setZoomImages([]);
    };
    const doubleTapRef = useRef(null);

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <Animated.View style={[styles.hoverEffect, { opacity: hoverAnimation }]}>
                    <Text style={styles.hoverText}>Refreshing...</Text>
                </Animated.View>

                <View style={styles.feedContainer}>
                    {user_feed_list.length > 0 ? user_feed_list.map(item => (
                        <View key={item.id} style={styles.feedItem}>
                            <View style={styles.feedHeader}>
                                {item.profile_image ? (
                                    <Image source={{ uri: item.profile_image }} style={styles.profileImage} />
                                ) : (
                                    <Image source={require('../../assets/ProfileFeed/Feed/Profile.png')} style={styles.profileImage} />
                                )}
                                <View style={styles.userInfoContainer}>
                                    <Text style={styles.username}>{item?.nick_name}</Text>
                                    <Text style={styles.profileTags}>{item?.health_goal}</Text>
                                </View>
                                {!isFollowing ? (
                                    <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
                                        <Text style={styles.followButtonText}>Follow</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
                                        <Text style={styles.followButtonText}>Following</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={handleOptions}>
                                    <Image source={require('../../assets/ProfileFeed/Feed/options.png')} style={styles.optionsIcon} />
                                </TouchableOpacity>
                                {dropdownVisible && (
                                    <View style={styles.dropdownMenu}>
                                        <TouchableOpacity onPress={handleShare}>
                                            <Text style={styles.dropdownItem}>Share</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleTag}>
                                            <Text style={styles.dropdownItem}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            {item?.post_image_urls?.length > 0 ? (
                                <TapGestureHandler onActivated={() => openZoomModal(item?.post_image_urls)}>
                                    <View>
                                        <CustomSlider images={item?.post_image_urls} />
                                    </View>
                                </TapGestureHandler>
                            ) : item?.post_video_url ? ( 

                                <>
                                {console.log('Rendering Video Component', item?.post_video_url)}
                                <View>
                                    <CustomSlider videos= {item?.post_video_url} />
                                </View>
                              
                                </>
                            ) : null 
                            }
                            <View style={styles.postActions}>
                                <TouchableOpacity onPress={handleLikes} style={styles.likeButton}>
                                    <Image
                                        source={liked ? require('../../assets/ProfileFeed/Feed/heartred.png') : require('../../assets/ProfileFeed/Feed/heart.png')}
                                        style={styles.actionIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleComments}>
                                    <Image source={require('../../assets/ProfileFeed/Feed/comment.png')} style={styles.actionIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleShare}>
                                    <Image source={require('../../assets/ProfileFeed/Feed/Communication.png')} style={styles.actionIconSmall} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleTag}>
                                    <Image source={tag ? require('../../assets/ProfileFeed/Feed/ribbon.png') : require('../../assets/ProfileFeed/Feed/ribbon1.png')}
                                        style={styles.actionIcon2} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.likes}>{likes} likes</Text>
                            <Text style={styles.username}>comment</Text>
                            <Text style={styles.postText}>
                                {isExpanded ? item?.post_description : truncateDescription(item?.post_description, 10)}
                                {wordCount(item?.post_description) > 10 && (
                                    <Text onPress={handleMore} style={styles.moreText}>
                                        {isExpanded ? ' less' : ' more...'}
                                    </Text>
                                )}
                            </Text>
                            <Text style={styles.comments}>16 comments</Text>
                            <Text style={styles.postday}>posted a day ago</Text>
                        </View>
                    )) : (
                        <ActivityIndicator size="large" color="#007bff" />
                    )}
                </View>
                <Modal visible={zoomModalVisible} transparent={true} onRequestClose={closeZoomModal}>
                    <ImageViewer imageUrls={zoomImages} onCancel={closeZoomModal} />
                </Modal>
            </ScrollView>
        </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F5F2',
        // width: width * 1,
    },
    feedContainer: {
        paddingHorizontal: 10,
        marginVertical: height * 0.0125,
    },
    hoverEffect: {
        position: 'absolute',
        top: height * 0.02,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        zIndex: 1,
        borderRadius: 5,
    },
    hoverText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    feedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.0125,
    },
    userInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: 25,
        marginRight: width * 0.03,
    },
    username: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        gap: 7,
    },
    profileTags: {
        backgroundColor: '#AFDBF5',
        borderRadius: 5,
        paddingHorizontal: width * 0.02,
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: width * 0.0125,
        color: '#fff',
        height: 20,
    },
    followButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingTop: 3,
        paddingHorizontal: width * 0.025,
        marginLeft: 'auto',
        marginEnd: 10,

    },
    followButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    optionsIcon: {
        width: width * 0.05,
        height: width * 0.05,
        marginLeft: 'auto',
    },
    dropdownMenu: {
        position: 'absolute',
        top: height * 0.05,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 1,
    },
    dropdownItem: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        padding: height * 0.012,
    },
    postImage: {
        width: '100%',
        height: width * 0.7,
        marginBottom: 12,
        // borderRadius: 10,
    },
    postActions: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    actionIconSmall: {
        width: 21.33,
        height: 24,
        marginRight: width * 0.05,

    },
    actionIcon: {
        width: 26,
        height: 24,
        marginRight: width * 0.06,

    },
    actionIcon2: {
        marginLeft: width * 0.55,
        width: 15.4,
        height: 19.34,
    },

    likes: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        marginBottom: height * 0.00625,
    },
    postText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    moreText: {
        color: '#7E7E7E',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    comments: {
        color: '#A9A9A9',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginBottom: 10,
    },
    postday: {
        color: '#A9A9A9',
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
    },
    commentInputContainer: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: height * 0.015,
        width: '100%',
    },
    commentProfileImage: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.05,
        backgroundColor: '#fff',
    },
    commentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: width * 0.020,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: width * 0.03,
        paddingVertical: 5,
        backgroundColor: '#fff',
        elevation: 1,


    },
    commentSendButton: {
        marginRight: 4,
        alignSelf: 'flex-end',
        marginBottom: 8,
    },
    commentInput: {
        flex: 1,
        marginRight: 10,
    },
    sendIcon: {

        width: 18.42,
        height: 16,
    },
    video: {
        width: '100%',
        height: 200,
    },
});
