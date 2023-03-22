const conexion  = require('../../../env/bdd')
const API       = require('../../../env/controller/api');
const UpdateAll        = require('../../../model/update_all');

//valores
// tabla    :   mt_zona
// modelo   :   zona


function poblar(fuctions,ultimo_registro){


        
    cargar(fuctions,ultimo_registro);
     

    
}

function cargar(fuctions,ultimo_registro){

    API.get("/v1/zona")
    .then( async function (response) {
        
        //elimina las relaciones actuales
        let commit = await conexion.knex('mt_zona_mt_sector').del()
        //console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
            
            let zona_data = await conexion.knex("mt_zona").select().where('id', response.data[i].id)
       
            zona = {...response.data[i]}

            zona.mt_subsistema_id=zona.mt_subsistema
            delete zona.mt_sector;
            delete zona.mt_subsistema;
            
            if(zona_data.length==0){
                
                    
                    insert(zona)

                    

            }else{
                //le agregamos el i los resultados de la api
                update(zona)
            }
            for (let zs = 0; zs < response.data[i].mt_sector.length; zs++) {
           
                conexion.insert({
                                    mt_zona_id:response.data[i].id,
                                    mt_sector_id:response.data[i].mt_sector[zs]
                                }
                                ,"mt_zona_mt_sector")
                
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
        //console.log(error)
        console.log("Sin conexión o problema con la API zona");
        object=new UpdateAll()
        object.p_value=object.getFinish()
        conexion.knex('config').where('codigo', object.codigo).update( object ).then((resp)=>{})
    }); 
    
    


}



function insert(objet){
    conexion.insert(objet,"mt_zona","id")
}

function update(objet){
    conexion.update(objet,"mt_zona","id")
}


module.exports={
    poblar:poblar
}
