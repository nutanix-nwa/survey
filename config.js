module.exports = {
  dbType: 'mysql', // Change to 'sqlite' for SQLite
  mysqlConfig: {
    host: '"@@{mysql.address}@@"',
    user: 'root',
    password: 'P@ssw0rdP@ssw0rd',
    database: 'survey_db' // Change to your desired database name
  },
  sqliteConfig: {
    filename: 'survey_db.sqlite' // SQLite database file name
  }
};
