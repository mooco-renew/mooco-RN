import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// LeftArrowSvg 컴포넌트를 적절한 경로에서 임포트하세요.
import LeftArrowSvg from '../../../assets/images/navigation/leftarrow';

const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <LeftArrowSvg />
    </TouchableOpacity>
  );
};

export const backbtncolorbar = {
  headerStyle: {
    backgroundColor: '#FEF7FF',
    height: 50,
  },
  headerTintColor: '#000000',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold', 
    fontSize: 16,
  },
  headerLeft: () => <CustomBackButton />,
};
