import { View, Text, Button } from 'react-native';

// test용 스크린
export default function Second({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Second Screen</Text>
    <Button
        title="go First"
        onPress={() => navigation.navigate('First')}
      />
      <Button
        title="go Third"
        onPress={() => navigation.navigate('Third')}
      />
  </View>
  )
}
