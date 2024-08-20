import db from '../database';

export const createTable = async () => {
  try {
    (await db).transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS nfc_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tag_id TEXT
                );`,
        [],
      );
    });
  } catch (error) {
    console.log('Error creating table: ', error);
  }
};

export const deleteAllDataTest = async (): Promise<void> => {
  try {
    (await db).transaction(tx => {
      tx.executeSql('DELETE FROM nfc_data'),
      [],
      () => {
        console.log('All test data deleted succesfully');
      },
      (_: any, error: Error) => {
        console.log('Error deleting data from table: ', error);
        return false;
      }
    });
  } catch (error) {
    console.log('Error deleting data from table: ', error);
  }
}



///// TESTS //////
// export const insertDataTest = async (tag_id: string) => {
//   try {
//     (await db).transaction(tx => {
//       tx.executeSql('INSERT INTO nfc_data (tag_id) VALUES (?)', [tag_id]);
//     });
//   } catch (error) {
//     console.log('Error inserting test data: ', error);
//   }
// };