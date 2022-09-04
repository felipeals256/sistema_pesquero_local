const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');



//valores
// tabla    :   mt_arte
// modelo   :   arte


function poblar(){
        
    cargar();

}

function cargar(){
    
    API.get("/v1/arte")
    .then( async function (response) {

        for (let i = 0; i < response.data.length; i++) {

            let arte_data = await conexion.knex("mt_arte").select().where('id', response.data[i].id)
            arte={...response.data[i]}
            if(arte_data.length==0){
                    insert(arte)

            }else{
                //console.log(arte)
                update(arte)
            }
            
        }
    })
    .catch(function (error) {
        console.log("Sin conexión o problema con la API arte");
    });


}


function insert(objet){
    conexion.insert(objet,"mt_arte","id")
}

function update(objet){
    conexion.update(objet,"mt_arte","id")
}


module.exports={
    poblar:poblar
}
