'use strict'
import pg from 'pg'

//DB REMOTA
/*const client = new pg.Client({
    user:'postgres',
    host:'dbhealthproject.cuejicokttpc.us-east-2.rds.amazonaws.com',
    database:'dbhealthsystem',
    password:'4dm!n2O23',
    port:5432
}) */

// DB LOCAL
const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'dbhealthprojectlocal',
    password: 'admin',
    port: 5432
})

export default client
