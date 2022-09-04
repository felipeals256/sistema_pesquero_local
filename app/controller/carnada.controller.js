
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')





ipcMain.on('all:carnada',async(e,args)=>{

    //let data = await conexion.knex('mt_especie').where("mt_especie_tipo_id",2)
    //            .orderBy('mt_especie.nombre', 'asc');

    let data = await conexion.knex.select('mt_especie.*')
                .from('mt_especie')
                .leftJoin('mt_especie_mt_especie_tipo', 'mt_especie.id', 'mt_especie_mt_especie_tipo.mt_especie_id')
                .where('mt_especie_mt_especie_tipo.mt_especie_tipo_id',2)
                .orderBy('mt_especie.nombre', 'asc');

    //console.log(data)
    if(data){
        e.reply('all:carnada:response',JSON.stringify(data))
    }
})

ipcMain.on('all_unidad:carnada',async(e,args)=>{

    let data = await conexion.knex('mt_especie')
                .leftJoin('mt_unidad','mt_especie.mt_unidad_id','mt_unidad.id')
                .leftJoin('mt_especie_mt_especie_tipo', 'mt_especie.id', 'mt_especie_mt_especie_tipo.mt_especie_id')
                .select('mt_especie.*','mt_unidad.codigo as mt_unidad_codigo','mt_unidad.unidad as mt_unidad_unidad','mt_unidad.descripcion as mt_unidad_descripcion')
                .where("mt_especie_mt_especie_tipo.mt_especie_tipo_id",2)
                .orderBy('mt_especie.nombre', 'asc');

    //console.log(data)
    if(data){
        e.reply('all_unidad:carnada:response',JSON.stringify(data))
    }
})



