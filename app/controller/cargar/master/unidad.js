const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_unidad
// modelo   :   unidad


function poblar(fuctions,ultimo_registro){
    
    cargar(fuctions,ultimo_registro);
}

function cargar(fuctions,ultimo_registro){
    
    API.get("/v1/unidad")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {

            let unidad_data = await conexion.knex("mt_unidad").select().where('id', response.data[i].id)

            unidad = {...response.data[i]}
            //unidad

            if(unidad_data.length==0){

                
                insert(unidad);

            }else{
                //le agregamos el i los resultados de la api
                update(unidad)
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
        console.log("Sin conexión o problema con la API unidad");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    });


}


function insert(objet){
    conexion.insert(objet,"mt_unidad","id")
}

function update(objet){
    conexion.update(objet,"mt_unidad","id")
}


module.exports={
    poblar:poblar
}
