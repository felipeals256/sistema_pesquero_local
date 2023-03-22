const conexion          = require('../../env/bdd')
function iniciar(){
    if(process.env.MIGRATIONS=='true'){

        conexion.knex.schema
            .hasTable("migraciones")
            .then( async ifExist => {
                
                if(!ifExist){

                    let config = await conexion.knex.schema.createTable("migraciones", (table) =>{
                        table.increments('id');
                        table.string('nombre',200)
                    })
                    iniciar_migracion();
                }else{
                    iniciar_migracion();
                }

            })  
            .catch( err => {
                console.log('error !!!', err.message, err.stack)
                return
            })


        
    }

    async function  iniciar_migracion (){
        const fs = require('fs')
        const dir = __dirname+"/../../migrations"
        const files = fs.readdirSync(dir)

        const path = require('path')


        for (const file of files) {
            let config = await conexion.knex.select('nombre').from('migraciones').where('nombre',file);

            if(config.length==0){

                migracion = require('./../../migrations/'+(file))

                config = await conexion.knex('migraciones').insert({nombre:file})
            }
            

        }
    }
}

module.exports={
    iniciar:iniciar
}