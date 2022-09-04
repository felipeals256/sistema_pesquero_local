const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.hasTable("trampa_historico").then( async ifExist => {
        
        if(!ifExist){
            
            let config = await conexion.knex.schema.createTable("trampa_historico", (table) =>{

                    table.increments('id').primary();
                    table.string('viaje_id')
                    table.integer('mt_sector_id')
                    table.string('otro_sector')
                    table.boolean('ventana_escape')
                    table.integer('num_comercial')
                    table.integer('num_no_comercial')
                    table.string('bycatch_id')
                    table.integer('bycatch_cantidad')
                    table.string('observaciones')
                    //table.timestamp('created_at').defaultTo(dateFns.format(knex.fn.now(), 'hh:mm'))
                    table.timestamp('created_at');
                    table.timestamp('updated_at');
                    table.timestamp('deleted_at');
            })
            
        }

})  
.catch( err => {
    console.log('error migración ('+__filename+')', err.message, err.stack)
    return
})