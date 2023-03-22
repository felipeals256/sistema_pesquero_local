const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');



//valores
// tabla    :   mt_arte
// modelo   :   arte


function poblar(fuctions,ultimo_registro){
        
    cargar(fuctions,ultimo_registro);

}

function cargar(fuctions,ultimo_registro){

    
    
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
        console.log("Sin conexión o problema con la API arte");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
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
