const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'hotel_management',
})

client.connect()
  .then(() => console.log('🔥 Connected to database 🔥'))
  .catch((err) => console.log('💀 Error connecting to database', err))

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}

// client.query('SELECT * FROM hoteis').then(result => console.log(result))