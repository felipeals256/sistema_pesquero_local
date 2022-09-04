const conexion          = require('../env/bdd')
//const dateFns           = require("date-fns")

conexion.knex.schema.hasTable("user").then( async ifExist => {
        
        if(!ifExist){
            
            let config = await conexion.knex.schema.createTable("user", (table) =>{

                    table.increments('id').primary();
                    table.boolean('is_superuser')
                    table.string('username')
                    table.string('first_name')
                    table.string('last_name')
                    table.string('email')
                    table.string('pass_local')
                    table.string('user_type_id')
                    table.boolean('is_active')
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