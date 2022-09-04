const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');

//valores
// tabla    :   mt_sector
// modelo   :   sector


function poblar(){

        
    cargar();

}

function cargar(){
    
    API.get("/v1/sector")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {

            let sector_data = await conexion.knex("mt_sector").select().where('id', response.data[i].id)
            sector={...response.data[i]}

            if(sector_data.length==0){
                
                insert(sector)

            }else{
                //le agregamos el i los resultados de la api
                update(sector)
            }
            
        }
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API sector");
    });


}


function insert(objet){
    conexion.insert(objet,"mt_sector","id")
}

function update(objet){
    conexion.update(objet,"mt_sector","id")
}


module.exports={
    poblar:poblar
}
