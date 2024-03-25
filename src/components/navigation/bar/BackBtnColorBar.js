import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeftArrowSvg from '../../../assets/images/navigation/leftarrow';

const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.buttoncontainer} onPress={() => navigation.goBack()}>
      <LeftArrowSvg />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttoncontainer: {
    width: 50,
    height: '100%',
  }
});

export const backbtncolorbar = {
  headerStyle: {
    backgroundColor: '#151515',
    height: 40,
  },
  headerTintColor: '#ffffff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold', 
    fontSize: 16,
  },
  headerLeft: () => <CustomBackButton />,
};
