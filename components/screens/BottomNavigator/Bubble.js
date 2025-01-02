import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeedView from '../../../components/common/FeedView';

function Bubble() {
  return (
    <View style={styles.container}>
 
      <View style={styles.content}>
        <Text>
          jdoahvafdshf
        </Text>
        <FeedView />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F5F2',
    flex: 3,
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Bubble;
