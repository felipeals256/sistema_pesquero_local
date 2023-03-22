const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.alterTable('viaje', function (table) {
    
    table.float('total_capturado');

}).catch( err => {
    console.log('error migración ('+__filename+')', err.message, err.stack)
    return
})