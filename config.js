module.exports = {
  dbType: 'mysql', // Change to 'sqlite' for SQLite
  mysqlConfig: {
    host: "@@{mysql.IP_ADDRESS}@@",
    user: 'root',
    password: 'P@ssw0rdP@ssw0rd',
    database: 'survey_db' // Change to your desired database name
  },
  sqliteConfig: {
    filename: 'survey_db.sqlite' // SQLite database file name
  }
};
