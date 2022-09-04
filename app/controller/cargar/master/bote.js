const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');

//valores
// tabla    :   mt_bote
// modelo   :   bote

function poblar(){


        cargar();

}


function cargar(){
    
    API.get("/v1/bote")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {
            //let {id,...rest} = response.data[i] 

            let bote_data = await conexion.knex("mt_bote").select().where('id', response.data[i].id)
            bote={...response.data[i]}
            if(bote_data.length==0){
                
                insert(bote)

            }else{
                //le agregamos el i los resultados de la api
                update(bote)
            }
            
        }
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API bote");
    });


}

function insert(objet){

    conexion.insert(objet,"mt_bote","id")
}

function update(objet){
    conexion.update(objet,"mt_bote","id")
}


module.exports={
    poblar:poblar
}
