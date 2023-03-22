const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_bote
// modelo   :   bote

function poblar(fuctions,ultimo_registro){


        cargar(fuctions,ultimo_registro);

}


function cargar(fuctions,ultimo_registro){
    
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
        console.log("Sin conexión o problema con la API bote");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
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
