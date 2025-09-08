import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { createTable } from '../../database/sqlite_database/migrations/createTable';
import { deleteNfcData, getNfcData, insertNfcData } from '../../database/sqlite_database/queries';
import ScanNfcButton from '../../components/ScanNfcButton';
import { TagEvent } from 'react-native-nfc-manager';

import { API_URL } from '@env';

type SqliteProps = {
  id: string,
  tag_id: string;
};

function SqLiteNFC() {
  const [dataNfcLocal, setDataNfcLocal] = useState<SqliteProps[]>([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await createTable();
        await getDataFromDatabaseLocal();
        await handleSendDataToServer();
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
  
    initialize();
  }, []);

  const checkConnectionServer = (): Promise<boolean> => {
    return (
      fetch(`${API_URL}/nfc`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // return res.json(); // Chame json() como uma função
        return res.json()
      })
      .then(data => {
        console.log('Data received', data);
        return true
      })
      .catch (error =>  {
        console.error('Error fetching data:', error);
        return false
      })
    )
  }

  const getDataFromDatabaseLocal = async () => {
    const data = await getNfcData();
    try {
      if (data && data.length > 0) {
        setDataNfcLocal(data)
      } else {
        Alert.alert('Data not found in db local')
      }
    } catch (error) {
      console.error('Error handling database:', error);
      Alert.alert('Error', 'An error occurred while fetching data');
    }
  }

  const handleDataNfc = async (result: TagEvent | null) => {
    if (result) {
      const tag_id: string | undefined = result.id;
      console.log('TAG_ID: ', tag_id)
      if (tag_id) {
        try {
          await insertNfcData(tag_id);
          await getDataFromDatabaseLocal();
          await handleSendDataToServer();
        } catch (error) {
          console.error('Error handling NFC data:', error);
        }
      }
    }
  }

  const handleSendDataToServer = async () => {
    try {
      const isConnect: boolean = await checkConnectionServer();
      console.log('Is connected: ', isConnect)
      if (isConnect) {
        for (let i = 0; i < dataNfcLocal.length; i++) {
          const id: string = dataNfcLocal[i].id;
          const tag_id: string = dataNfcLocal[i].tag_id;
          fetchNfcTag(id, tag_id);
        }
      } else {
        console.log('Failed connect to the server');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  const fetchNfcTag = (id: string, tag_id: string) => {
    console.log(`id: ${id}, tag_id: ${tag_id}`)
    const body: string = JSON.stringify({id, tag_id})
    fetch(`${API_URL}/nfc`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.statusText} Status: ${res.status}`);
        }
        deleteNfcData(id).then(() => 
          getDataFromDatabaseLocal()
        )
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      })
  }

  return (
    <View style={styles.wrapper}>
      <ScanNfcButton onResult={handleDataNfc} />
      {dataNfcLocal.length > 0 ? (
        dataNfcLocal.map((item, index) => (
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