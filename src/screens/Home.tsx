import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavButton from '../components/NavButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  JsonNFC: undefined;
  SqLiteNFC: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function Home({ navigation }: Props) {
  return (
    <View style={styles.wrapper}>
      <NavButton
        title="Json NFC"
        onPress={() => navigation.navigate('JsonNFC')}
      />
      <NavButton
        title="SqLite NFC"
        onPress={() => navigation.navigate('SqLiteNFC')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0c0a09',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Home;
