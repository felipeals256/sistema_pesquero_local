
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')





ipcMain.on('all:especie',async(e,args)=>{

    let data = await conexion.knex.select('mt_especie.*')
                .from('mt_especie')
                .leftJoin('mt_especie_mt_especie_tipo', 'mt_especie.id', 'mt_especie_mt_especie_tipo.mt_especie_id')
                .where('mt_especie_mt_especie_tipo.mt_especie_tipo_id',1)
                .orderBy('mt_especie.codigo', 'desc');

    //console.log(data)
    if(data){
        e.reply('all:especie:response',JSON.stringify(data))
    }
})

ipcMain.on('all:bycatch',async(e,args)=>{

    //let data = await conexion.knex('mt_especie').where('mt_especie.mt_especie_tipo_id',3)
    //            .orderBy('mt_especie.codigo', 'desc');

    let data = await conexion.knex.select('mt_especie.*')
                .from('mt_especie')
                .leftJoin('mt_especie_mt_especie_tipo', 'mt_especie.id', 'mt_especie_mt_especie_tipo.mt_especie_id')
                .where('mt_especie_mt_especie_tipo.mt_especie_tipo_id',3)
                .orderBy('mt_especie.codigo', 'desc');

    //console.log(data)
    if(data){
        e.reply('all:bycatch:response',JSON.stringify(data))
    }
})



