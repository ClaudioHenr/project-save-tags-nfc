import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JsonNFC from '../screens/use_json/JsonNFC';
import SqLiteNFC from '../screens/use_sqlLite/SqLiteNFC';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Stack.Screen
        name="JsonNFC"
        component={JsonNFC}
        options={{title: 'NFC JSON'}}
      />
      <Stack.Screen
        name="SqLiteNFC"
        component={SqLiteNFC}
        options={{title: 'NFC SQLITE'}}
      />
    </Stack.Navigator>
  );
}

export default StackNav;
