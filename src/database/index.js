// connection to database in postgress
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: "postgresql://user:password@localhost:5432/name_database"
})

async function query(queryString,params,callback){
    return pool.query(queryString,params,callback)
}

async function getClient() {
    return pool.connect()
}

module.exports = { query, getClient }