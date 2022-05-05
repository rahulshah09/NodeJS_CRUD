const Pool =require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "admin",
    database: "synergy_database",
    host: "localhost",
    port: 5432
});

module.exports =pool;
/*const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "admin",
    database: "synergy_database"
})

client.connect();

client.query(`select * from public.user`,(err, result) =>{
    debugger;
    if(!err){
        console.log(result.rows);
    }
    client.end();
})*/