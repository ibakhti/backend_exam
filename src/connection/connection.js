const mysql = require('mysql')

const conn = mysql.createConnection({
    user: 'bakhti',
    password: 'Dindabakhti0613',
    host: 'localhost',
    database: 'ujianbackend',
    port: '3306'
})

module.exports = conn