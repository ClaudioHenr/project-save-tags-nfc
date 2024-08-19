import db from './database';

export const insertNfcData = async (tag_id: string) => {
  (await db).transaction(tx => {
    tx.executeSql('INSERT INTO nfc_data (tag_id) VALUES (?)', [tag_id]);
  });
};

export const getNfcData = async (): Promise<any[]> => {
  try {
    const dbInstance = await db;
    return new Promise<any[]>((resolve, reject) => {
      dbInstance.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM nfc_data',
          [],
          (_, result) => {
            const rows = result.rows;
            const data = [];
            for (let i = 0; i < rows.length; i++) {
              data.push(rows.item(i));
            }
            resolve(data);
          },
          (_, error) => {
            console.log('Error fetching data:', error);
            reject(error);
            return false;
          },
        );
      });
    });
  } catch (error) {
    console.log('Error in get data from table:', error);
    throw error;
  }
};
