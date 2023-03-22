const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.alterTable('mt_bote', function (table) {
    
    table.string('rpa_armador');
    table.string('caleta');

}).catch( err => {
    console.log('error migración ('+__filename+')', err.message, err.stack)
    return
})

