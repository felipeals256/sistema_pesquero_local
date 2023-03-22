const conexion  = require('../../env/bdd')
const API       = require('../../env/controller/api');
const {newDate}  = require('../../env/utility')
const UpdateAll        = require('../../model/update_all');

//valores
// tabla    :   bote_vigencia
// modelo   :   bote_vigencia


function poblar(fuctions,ultimo_registro){


        
    cargar(fuctions,ultimo_registro);
 
}

function cargar(fuctions,ultimo_registro){
    
    API.get("/v1/user_type")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {

            let user_type_data = await conexion.knex("user_type").select().where('id', response.data[i].id)
      
            user_type={
                id                  :response.data[i].id,
                codigo              :response.data[i].codigo,
                nombre              :response.data[i].nombre,
                
            }
            if(user_type_data.length==0){
                
                insert(user_type);

            }else{
         
                //le agregamos el i los resultados de la api
                update(user_type)
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
        console.log("Sin conexión o problema con la API user_type.");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    });


}


function insert(objet){
    objet.created_at=newDate()
    objet.updated_at=newDate()
    conexion.insert(objet,"user_type","id")
}

function update(objet){
    objet.updated_at=newDate()
    conexion.update(objet,"user_type","id")
}


module.exports={
    poblar:poblar
}
