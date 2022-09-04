const conexion          = require('../env/bdd')


conexion.knex.schema.hasTable("carnada_registro").then( async ifExist => {
        
        if(!ifExist){
            
            let config = await conexion.knex.schema.createTable("carnada_registro", (table) =>{

                    table.increments('id').primary();
                    table.string('viaje_id')
                    table.integer('mt_unidad_id')
                    table.integer('mt_especie_id')
                    table.integer('volumen')
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