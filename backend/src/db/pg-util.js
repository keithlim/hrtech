const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === "PRODUCTION";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 0, // how long to wait if no connections available
    idleTimeoutMillis: 5000 // how long to wait till disconnecting idle connections
});


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

pool.on('connect', () => {
    console.log('Connected to database successfully.');
});

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now()
        pool.query(text, params, (err, res) => {
            const duration = Date.now() - start
            // console.log('executed query', { text, duration, rows: res.rowCount })
            callback(err, res)
        });
    }
}