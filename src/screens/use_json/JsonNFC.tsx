import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NfcManager, { TagEvent } from 'react-native-nfc-manager';
import RNFS from 'react-native-fs';
import ScanNfcButton from '../../components/ScanNfcButton';


function JsonNFC() {
  const [supportNfc, setSupportNfc] = useState<boolean | null>(null);

  useEffect(() => {
    hasSupportNfc();
    readFile();
  }, [])

  const hasSupportNfc = async () => {
    const supported = await NfcManager.isSupported()
    setSupportNfc(supported)
    if (!supported) {
      console.log("theres is no support...")
      return
    }
    NfcManager.start()
  }

  const readFile = async () => {
    const path = RNFS.DocumentDirectoryPath + '/tagdata.json'
    try {
      const contentFile = await RNFS.readFile(path, 'utf8')
      console.log('Tags storaged in device: ', contentFile)
    } catch (ex) {
      console.log('Error reading file: ', ex)
    }
  }

  const createJsonFile = async (tag: TagEvent | null) => {
    if (tag === null) {
      return
    }
    const tagData = {
      id: tag.id
    }
    const path = RNFS.DocumentDirectoryPath + '/tagdata.json'
    await RNFS.writeFile(path, JSON.stringify(tagData), 'utf8')
    console.log('Tag data saved to ', path)
  }

  const handleDataNfc = (result: TagEvent | null) => {
    createJsonFile(result);
  }

  return (
    <View style={styles.wrapper}>
      <ScanNfcButton onResult={handleDataNfc}/>
      <Text>Is supported? {supportNfc === null ? "checking..." : supportNfc ? "Yes" : "No"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0c0a09',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JsonNFC;
