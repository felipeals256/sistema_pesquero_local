const conexion          = require('../env/bdd')


conexion.knex.schema.hasTable("viaje").then( async ifExist => {
        
        if(!ifExist){
            
            let config = await conexion.knex.schema.createTable("viaje", (table) =>{
                    
                    table.increments('id').primary();
                    table.string('tripcode',14);
                    table.integer('declaracion')
                    table.integer('mt_subsistema_id')
                    table.integer('mt_bote_id')
                    table.date('fecha')
                    table.integer('temporada')
                    table.integer('n_trampas_agua')
                    table.integer('n_trampas_visitadas')
                    table.integer('mt_especie_id')
                    table.string('comentario',200)
                    table.boolean('finalizado').default(false)
                    table.boolean('enviado').default(false)
                    table.date('enviado_fecha')
                    table.integer('user_created');
                    table.integer('user_updated');
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
