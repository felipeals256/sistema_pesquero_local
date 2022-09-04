const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');

//valores
// tabla    :   mt_subsistema
// modelo   :   subsistema


function poblar(){
    
    cargar();

}

function cargar(){
    
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
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API subsistema");
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
