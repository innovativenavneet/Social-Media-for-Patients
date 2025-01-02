import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, FlatList, StyleSheet, PanResponder } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const CustomSlider = ({ images = [], videos = [] }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine images and videos into one array
  const media = [...images, ...videos];

  // PanResponder to handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        const { dx } = gestureState;
        if (dx > 50) {
          // Swipe right
          flatListRef.current.scrollToIndex({
            index: Math.max(0, currentIndex - 1),
            animated: true,
          });
        } else if (dx < -50) {
          // Swipe left
          flatListRef.current.scrollToIndex({
            index: Math.min(media.length - 1, currentIndex + 1),
            animated: true,
          });
        }
      },
    })
  ).current;

  const renderItem = ({ item }) => {
    
    console.log("Line no.38",item)
  
    if (item?.endsWith('.mp4')) {
      console.log('Rendering Video:', item);
      return (
        <View style={styles.slide}>
          <Video
            source={{ uri: item}}
            style={styles.video}
            resizeMode="contain"
            controls={true}
            onError={(error) => console.error('Video Playback Error:', error)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.slide}>
          <Image source={{ uri: item }} style={styles.image} />
        </View>
      );
    }
  };
  

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {media?.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? '#000' : '#ccc' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        {...panResponder.panHandlers}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width, 
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  video:{
    width: '100%',
    height: 200,
  },
});

export default CustomSlider;
