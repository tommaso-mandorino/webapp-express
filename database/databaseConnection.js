import mysql2 from 'mysql2';

const databaseConnectionOptions = {
    user: process.env.DBMS_USER,
    password: process.env.DBMS_PASSWORD,
    database: process.env.DBMS_USE
}

const databaseConnection = mysql2.createConnection(databaseConnectionOptions);

databaseConnection.connect(error => {

    if (error) {
        throw new Error('🚨 Unable to connect to the database.');
    }

    console.log(`✅ Successfully connected to '${databaseConnection.config.database}' database on 'http://${databaseConnection.config.host}:${databaseConnection.config.port}' as '${databaseConnection.config.user}' user.`);

});

export default databaseConnection;