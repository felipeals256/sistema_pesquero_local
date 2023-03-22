const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.alterTable('trampa_historico', function (table) {
    
    table.integer('mt_zona_id');

}).catch( err => {
    console.log('error migración ('+__filename+')', err.message, err.stack)
    return
})

