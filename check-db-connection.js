const { Client } = require('pg');

try {
    require('dotenv').config();
} catch (e) {
    // dotenv not available
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

client.connect()
    .then(() => {
        console.log('database connected successfully');
        return client.end();
    })
    .catch(err => {
        console.error('connection error', err.stack);
        process.exit(1);
    });