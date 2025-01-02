import React, { useEffect } from 'react';
import { View, Button, Alert,Text ,Dimensions} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleLogout } from '../../API/auth';

const { width, height } = Dimensions.get('window');

const YouAreAuthenticated = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('YouAreAuthenticated component mounted');
  }, []);

  const handleLogoutClick = async () => {
    console.log('Logout button clicked');
    Alert.alert('Logout clicked', 'Attempting to logout');
    try {
      await handleLogout(dispatch);
      navigation.navigate('LoginScreen');
      console.log('Logout successful');

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View>
       <Text style={{ fontSize: 44, fontWeight: 'bold', color: '#000',  padding: width * 0.05, marginTop: 50 }}>
        you are already authenticated !!!! 
      </Text>
      <View style={{borderRadius: 50, width: 200, margin: 50,}}>
      <Button title="Logout" onPress={handleLogoutClick} />
      </View>
   
     <Text>
    
     </Text>
   
    </View>
  );
};

export default YouAreAuthenticated;
