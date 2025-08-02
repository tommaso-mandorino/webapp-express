import mysql2 from 'mysql2';

const mysqlConnectionInformation = {
    user: process.env.DBMS_USER,
    password: process.env.DBMS_PASSWORD,
    database: process.env.DBMS_USE
}

const mysqlConnection = new mysql2.createConnection(mysqlConnectionInformation);

if (!mysqlConnection)
    throw new Error('🚨 Unable to connect to the database.');
    
console.log('✅ Connected successfully to the database.');

export default mysqlConnection;