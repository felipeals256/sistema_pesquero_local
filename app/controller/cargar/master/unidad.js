const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');

//valores
// tabla    :   mt_unidad
// modelo   :   unidad


function poblar(){
    
    cargar();
}

function cargar(){
    
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
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API unidad");
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
