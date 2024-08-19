import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';
import RNFS from 'react-native-fs';


function JsonNFC() {
  const [supportNfc, setSupportNfc] = useState<boolean | null>(null);

  useEffect(() => {
    hasSupportNfc();
    readFile();
  }, [])

  const hasSupportNfc = async () => {
    let supported = await NfcManager.isSupported()
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

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.log('Tag found', tag);
      createJsonFile(tag)
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text style={styles.btn_text}>Scan a Tag</Text>
      </TouchableOpacity>
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
  btn_text: {
    color: 'white',
    fontSize: 25,
  }
});

export default JsonNFC;
