import { View, Text, Button } from 'react-native';

// test용 스크린
export default function Third({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>third Screen</Text>
        <Button
        title="go First"
        onPress={() => navigation.navigate('First')}
      />
       <Button
        title="go Second"
        onPress={() => navigation.navigate('Second')}
      />
      </View>
    );
  }