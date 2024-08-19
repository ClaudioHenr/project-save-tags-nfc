import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';

type ScanProps = {
    onResult: (result: TagEvent | null) => void;
}

const ScanNfcButton: React.FC<ScanProps> = ({ onResult }) => {
  const [supportNfc, setSupportNfc] = useState<boolean | null>(null);

  useEffect(() => {
    hasSupportNfc();
  }, [])

  const hasSupportNfc = async () => {
    let supported: boolean | null = await NfcManager.isSupported()
    setSupportNfc(supported)
    if (!supported) {
      console.log("theres is no support...")
      return
    }
    NfcManager.start()
  }

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag: TagEvent | null = await NfcManager.getTag();
      console.log('Tag found', tag);
      onResult(tag)
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.btn} onPress={readNdef}>
        <Text style={styles.btn_text}>Scan a Tag</Text>
      </TouchableOpacity>
      <Text>Is supported? {supportNfc === null ? "checking..." : supportNfc ? "Yes" : "No"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0c0a09',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#1e40af',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0569FF',
  },
  btn_text: {
    color: 'white',
    fontSize: 25,
  }
});

export default ScanNfcButton;
