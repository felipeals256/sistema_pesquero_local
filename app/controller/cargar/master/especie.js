const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_especie
// modelo   :   especie


function poblar(fuctions,ultimo_registro){

        
    cargar(fuctions,ultimo_registro);
    
}

function cargar(fuctions,ultimo_registro){
    
    API.get("/v1/especie")
    .then( async function (response) {

        let commit = await conexion.knex('mt_especie_mt_especie_tipo').del()

        for (let i = 0; i < response.data.length; i++) {
           
            let especie_data = await conexion.knex("mt_especie").select().where('id', response.data[i].id)

            especie = {...response.data[i]}
            //especie.mt_especie_tipo_id = response.data[i].mt_especie_tipo
            especie.mt_unidad_id = response.data[i].mt_unidad
            delete especie.mt_especie_tipo
            delete especie.mt_unidad

            if(especie_data.length==0){

                
                insert(especie);

            }else{
                //le agregamos el i los resultados de la api
                update(especie)
            }
            for (let zs = 0; zs < response.data[i].mt_especie_tipo.length; zs++) {
                conexion.insert({
                                    mt_especie_id:response.data[i].id,
                                    mt_especie_tipo_id:response.data[i].mt_especie_tipo[zs]
                                }
                                ,"mt_especie_mt_especie_tipo")
                
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
        console.log("Sin conexión o problema con la API especie");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    });


}


function insert(objet){
    conexion.insert(objet,"mt_especie","id")
}

function update(objet){
    conexion.update(objet,"mt_especie","id")
}


module.exports={
    poblar:poblar
}
