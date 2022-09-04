const conexion  = require('../../env/bdd')
const API       = require('../../env/controller/api');
const {newDate}  = require('../../env/utility')

//valores
// tabla    :   bote_vigencia
// modelo   :   bote_vigencia


function poblar(){


        
    cargar();
 
}

function cargar(){
    
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
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API user_type.");
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
