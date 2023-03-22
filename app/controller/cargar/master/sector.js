const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_sector
// modelo   :   sector


function poblar(fuctions,ultimo_registro){

        
    cargar(fuctions,ultimo_registro);

}

function cargar(fuctions,ultimo_registro){
    
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
        console.log("Sin conexión o problema con la API sector");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
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
