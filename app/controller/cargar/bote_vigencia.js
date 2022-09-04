const conexion  = require('../../env/bdd')
const API       = require('../../env/controller/api');

//valores
// tabla    :   bote_vigencia
// modelo   :   bote_vigencia


function poblar(){


        
    cargar();
 
}

function cargar(){
    
    API.get("/v1/bote_vigencia")
    .then( async function (response) {
        for (let i = 0; i < response.data.length; i++) {

            let bote_vigencia_data = await conexion.knex("bote_vigencia").select().where('id', response.data[i].id)
      
            bote_vigencia={
                id                  :response.data[i].id,
                fecha_termino       :response.data[i].fecha_termino,
                mt_bote_id          :response.data[i].mt_bote,
                mt_subsistema_id    :response.data[i].mt_subsistema,
                user_modificador_id :response.data[i].user_modificador,
                
            }
            if(bote_vigencia_data.length==0){
                
                insert(bote_vigencia);

            }else{
         
                //le agregamos el i los resultados de la api
                update(bote_vigencia)
            }
            
        }
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API bote_vigencia.");
    });


}


function insert(objet){
    conexion.insert(objet,"bote_vigencia","id")
}

function update(objet){
    conexion.update(objet,"bote_vigencia","id")
}


module.exports={
    poblar:poblar
}
