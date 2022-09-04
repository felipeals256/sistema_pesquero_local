const conexion          = require('../../env/bdd')
const bote              = require("../../controller/cargar/master/bote")
const arte              = require("../../controller/cargar/master/arte")
const especie           = require("../../controller/cargar/master/especie")
const especie_tipo      = require("../../controller/cargar/master/especie_tipo")
const subsistema        = require("../../controller/cargar/master/subsistema")
const sector            = require("../../controller/cargar/master/sector")
const unidad            = require("../../controller/cargar/master/unidad")
const zona              = require("../../controller/cargar/master/zona")

const bote_vigencia     = require("../../controller/cargar/bote_vigencia")
const user_type         = require("../../controller/cargar/user_type")
const user              = require("../../controller/cargar/user")

function initConfig(){

    conexion.knex.schema
    .hasTable("config")
    .then( async ifExist => {
        
        if(ifExist){
            
            let config = await conexion.knex("config").select().where('p_value', 'si').andWhere('codigo', 'INSERT_API').limit(1);

            if(config.length > 0){
                //lo volvemos a dejar en 'no'
                //config = await conexion.knex('config').where({ id: config[0].id }).update({ p_value: "no" });
                poblar();
            }
            
        }

    })  
    .catch( err => {
        console.log('error !!!', err.message, err.stack)
        return
    })

    

}

function poblar(){
    bote.poblar();
    arte.poblar();
    especie.poblar();
    especie_tipo.poblar();
    subsistema.poblar();
    sector.poblar();
    unidad.poblar();
    zona.poblar();

    bote_vigencia.poblar();
    user_type.poblar();
    user.poblar();
}


module.exports={
    initConfig:initConfig
}