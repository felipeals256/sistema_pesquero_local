const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.hasTable("api_historico").then( async ifExist => {
        
        if(!ifExist){
            
            let config = await conexion.knex.schema.createTable("api_historico", (table) =>{

                    table.increments('id').primary();
                    table.string('api')
                    table.string('response')
                    table.boolean('success')
                    table.integer('codigo')
                    //-----------------------------
                    table.timestamp('created_at');
            })
            
        }

})  
.catch( err => {
    console.log('error migración ('+__filename+')', err.message, err.stack)
    return
})