import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { createTable, deleteAllDataTest, insertDataTest, } from '../../database/sqlite_database/migrations/createTable';
import { getNfcData, insertNfcData } from '../../database/sqlite_database/queries';
import ScanNfcButton from '../../components/ScanNfcButton';
import { TagEvent } from 'react-native-nfc-manager';

import { API_URL } from '@env';

type SqliteProps = {
  id: string,
  tag_id: string;
};

function SqLiteNFC() {
  const [dataNfc, setDataNfc] = useState<TagEvent | null>(null);
  const [dataNfcFormat, setDataNfcFormat] = useState<SqliteProps>();
  const [dataTest, setDataTest] = useState<SqliteProps[]>([]);

  useEffect(() => {
    checkConnectionServer()
    createTable();
    handleDatabase()
  }, []);

  const checkConnectionServer = () => {
    fetch(`${API_URL}/nfc`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Chame json() como uma função
      })
      .then(data => {
        console.log('Data received', data);
      })
      .catch (error =>  {
        console.error('Error fetching data:', error);
      });
  }

  const handleDatabase = async () => {
    const data: any[] = await getNfcData();
    try {
      if (data && data.length > 0) {
        setDataTest(data)
      } else {
        Alert.alert('Data not found')
      }
    } catch (error) {
      console.error('Error handling database:', error);
      Alert.alert('Error', 'An error occurred while fetching data');
    }
  }

  const handleDataNfc = (result: TagEvent | null) => {
    if (result) {
      setDataNfc(result);
      console.log('Tag scanned: ', dataNfc);
      const tag_id: string | undefined = result.id;
      console.log('TAG_ID: ', tag_id)
      if (tag_id) {
        insertNfcData(tag_id);
      }
    }
  }

  return (
    <View style={styles.wrapper}>
      <ScanNfcButton onResult={handleDataNfc} />
      {dataTest.length > 0 ? (
        dataTest.map((item, index) => (
          <Text key={item.id} style={styles.text}>{index} {item.tag_id}</Text>
        ))
      ) : (
        <Text style={styles.text}>No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 25,
  },

  view_test: {
    height: 20,
    width: 20,
  },

  wrapper: {
    alignItems: 'center',
    backgroundColor: '#0c0a09',
    flex: 1,
    justifyContent: 'center',
  },
});

export default SqLiteNFC;
