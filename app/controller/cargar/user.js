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
    
    API.get("/v1/user")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {

            let user_data = await conexion.knex("user").select().where('id', response.data[i].id)
      
            user={
                id                 :response.data[i].id,
                is_superuser       :response.data[i].is_superuser,
                username           :response.data[i].username,
                first_name         :response.data[i].first_name,
                last_name          :response.data[i].last_name,
                email              :response.data[i].email,
                email              :response.data[i].email,
                pass_local         :response.data[i].pass_local,
                user_type_id          :response.data[i].user_type,
                is_active          :response.data[i].is_active
            }
            if(user_data.length==0){
                
                insert(user);

            }else{
         
                //le agregamos el i los resultados de la api
                update(user)
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
        console.log("Sin conexión o problema con la API user.");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    });


}


function insert(objet){
    objet.created_at=newDate()
    objet.updated_at=newDate()
    conexion.insert(objet,"user","id")
}

function update(objet){
    objet.updated_at=newDate()
    conexion.update(objet,"user","id")
}


module.exports={
    poblar:poblar
}
