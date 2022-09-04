const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.hasTable("user_type").then( async ifExist => {
        
        if(!ifExist){
            
            let config = await conexion.knex.schema.createTable("user_type", (table) =>{

                    table.increments('id').primary();
                    table.integer('codigo')
                    table.string('nombre')
                    //-----------------------------
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