const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_especie_tipo
// modelo   :   especie_tipo


function poblar(fuctions,ultimo_registro){
        
    cargar(fuctions,ultimo_registro);
}

function cargar(fuctions,ultimo_registro){
    
    API.get("/v1/especie_tipo")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {

            let especie_tipo_data = await conexion.knex("mt_especie_tipo").select().where('id', response.data[i].id)
            especie_tipo={...response.data[i]}

            if(especie_tipo_data.length==0){

                
                insert(especie_tipo)

            }else{
                //le agregamos el i los resultados de la api
                update(especie_tipo)
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
        console.log("Sin conexión o problema con la API especie_tipo");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    });


}


function insert(objet){
    conexion.insert(objet,"mt_especie_tipo","id")
}

function update(objet){
    conexion.update(objet,"mt_especie_tipo","id")
}


module.exports={
    poblar:poblar
}
