const Pool = require('pg').Pool

const ddc1 = new Pool({
    user: 'postgres',
    host: '000',
    database: 'ddc',
    password: 'Pgis@rti2dss@2020',
    port: 5432,
});

const ddc = new Pool({
    user: 'postgres',
    host: 'postgis',
    database: 'ddc',
    password: '1234',
    port: 5432,
});


exports.ddc = ddc;