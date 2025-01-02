import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/Logo/main.png')} style={styles.logo} />
        </View>
    );
};
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBFBFB',
        padding: width * 0.05,  
    },
    logo: { 
        resizeMode: 'contain',
        width: 322,
        height: 102,
        paddingVertical: 371,
        paddingHorizontal: 34,  
    },

});

export default SplashScreen;
