import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'tags.db',
  location: 'default',
});

export default db;
