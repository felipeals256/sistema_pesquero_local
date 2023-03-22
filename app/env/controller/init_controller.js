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
const UpdateAll        = require('../../model/update_all');

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
    object=new UpdateAll()
    conexion.knex.select('*').from('config').where('codigo', 'update_bdd').then(
        (config) =>{
            if(config.length==0){
                conexion.knex('config').insert(object).then(
                    (resp)=>{
                        update_all_reg();
                    }
                );
            }else{
                object.p_value=object.getFinish()
                //Primero terminamos algun proceso anterior
                conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{
                    //luego iniciamos uno nuevo
                    object=new UpdateAll()
                    conexion.knex('config').where('codigo', object.codigo).update( object ).then(
                        (resp)=>{
                            update_all_reg();
                        }
                    );
                })
                
            }
        }
    )
    /*
    if(config.length==0){
        int=await conexion.knex.knex('config').insert({
            codigo:'update_bdd',
            p_value:'finish',
            s_value:null,
            t_value:null,
        });
    }
    */
    /*
    config = await knex('config').insert({
        codigo:'update_bdd',
        p_value:'finish',
        s_value:null,
        t_value:null,
    });
    */
    /*
    
    */
  
    //especie.poblar();
    //especie_tipo.poblar();
    //subsistema.poblar();
    //sector.poblar();
    //unidad.poblar();
    //zona.poblar();
    //bote_vigencia.poblar();
    //user_type.poblar();
    //user.poblar();
}

function update_all_reg(){
    bote.poblar(function(){arte.poblar(
        function(){especie.poblar(
            function(){especie_tipo.poblar(
                function(){subsistema.poblar(
                    function(){sector.poblar(
                        function(){unidad.poblar(
                            function(){zona.poblar(
                                function(){bote_vigencia.poblar(
                                    function(){user_type.poblar(
                                        function(){user.poblar(
                                            null,true
                                        )},false
                                    )},false
                                )},false
                            )},false
                        )},false
                    )},false
                )},false
            )},false
        )},false
    )},false);
}


module.exports={
    initConfig:initConfig
}