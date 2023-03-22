
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')





ipcMain.on('all:especie',async(e,args)=>{

    let data = await conexion.knex.select('mt_especie.*')
                .from('mt_especie')
                .leftJoin('mt_especie_mt_especie_tipo', 'mt_especie_mt_especie_tipo.mt_especie_id', 'mt_especie.id')
                .leftJoin('mt_especie_tipo', 'mt_especie_tipo.id', 'mt_especie_mt_especie_tipo.mt_especie_tipo_id')
                .where('mt_especie_tipo.codigo',1)
                .orderBy('mt_especie.nombre', 'asc');

    //console.log(data)
    if(data){
        e.reply('all:especie:response',JSON.stringify(data))
    }
})

ipcMain.on('all:bycatch',async(e,args)=>{

    //let data = await conexion.knex('mt_especie').where('mt_especie.mt_especie_tipo_id',3)
    //            .orderBy('mt_especie.codigo', 'desc');

    /*
    select * from mt_especie
    left join mt_especie_mt_especie_tipo on mt_especie_mt_especie_tipo.mt_especie_id = mt_especie.id
    left join mt_especie_tipo on mt_especie_tipo.id = mt_especie_mt_especie_tipo.mt_especie_tipo_id
    where mt_especie_tipo.codigo=3
    
    */

    let data = await conexion.knex.select('mt_especie.*')
                .from('mt_especie')
                .leftJoin('mt_especie_mt_especie_tipo', 'mt_especie_mt_especie_tipo.mt_especie_id', 'mt_especie.id')
                .leftJoin('mt_especie_tipo', 'mt_especie_tipo.id', 'mt_especie_mt_especie_tipo.mt_especie_tipo_id')
                .where('mt_especie_tipo.codigo',3)
                .orderBy('mt_especie.nombre', 'asc');

    //console.log(data)
    if(data){
        e.reply('all:bycatch:response',JSON.stringify(data))
    }
})



