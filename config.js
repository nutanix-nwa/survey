module.exports = {
  dbType: 'sqlite', // Change to 'sqlite' for SQLite
  mysqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'survey_db' // Change to your desired database name
  },
  sqliteConfig: {
    filename: 'survey_db.sqlite' // SQLite database file name
  }
};
