const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_subsistema
// modelo   :   subsistema


function poblar(fuctions,ultimo_registro){
    
    cargar(fuctions,ultimo_registro);

}

function cargar(fuctions,ultimo_registro){
    
    API.get("/v1/subsistema")
    .then( async function (response) {
        let commit = await conexion.knex('mt_subsistema_mt_zona').del()
        for (let i = 0; i < response.data.length; i++) {

            let subsistema_data = await conexion.knex("mt_subsistema").select().where('id', response.data[i].id)
            subsistema={...response.data[i]}
            delete subsistema.mt_zona;
            if(subsistema_data.length==0){

                
                insert(subsistema)

            }else{
                //le agregamos el i los resultados de la api
                update(subsistema)
            }
            for (let zs = 0; zs < response.data[i].mt_zona.length; zs++) {
           
                conexion.insert({
                                    mt_subsistema_id:response.data[i].id,
                                    mt_zona_id:response.data[i].mt_zona[zs]
                                }
                                ,"mt_subsistema_mt_zona")
                
            }
            
        }

        if(fuctions){
            fuctions()
        }
        if(ultimo_registro){
            object=new UpdateAll()
            object.p_value=object.getFinish()
            conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
        }
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API subsistema");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    });


}


function insert(objet){
    conexion.insert(objet,"mt_subsistema","id")
}

function update(objet){
    conexion.update(objet,"mt_subsistema","id")
}


module.exports={
    poblar:poblar
}
