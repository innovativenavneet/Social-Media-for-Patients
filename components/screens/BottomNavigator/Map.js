import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeedView from '../../../components/common/FeedView';
function Map() {
  return (
    <View style={styles.container}>
 
      <View style={styles.content}>
        <Text>
          jdoahvafdshf
        </Text>
      </View>
<FeedView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F5F2',
    flex: 1,
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
