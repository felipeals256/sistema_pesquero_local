
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')


ipcMain.on('all:sector',async(e,args)=>{
    //si en los argumentos viene el id del subsistema, entonces retornamos solo los registros asociados a ese subsistema
    let data = []
    if(args.subsistema_id){
        data = await conexion.knex.select(' mt_sector.*').distinct(' mt_sector.nombre')
                //.leftJoin('mt_subsistema_mt_zona', 'mt_subsistema_mt_zona.sector_id', 'mt_sector.nombre')
                .from('mt_sector')
                .leftJoin('mt_zona_mt_sector', 'mt_zona_mt_sector.mt_sector_id', 'mt_sector.id')
                .leftJoin('mt_subsistema_mt_zona', 'mt_subsistema_mt_zona.mt_zona_id', 'mt_zona_mt_sector.mt_zona_id')
                .where('mt_subsistema_mt_zona.mt_subsistema_id', args.subsistema_id)
                .orderBy('mt_sector.nombre');

    }else{

        data = await conexion.knex('mt_sector')
                .orderBy('mt_sector.nombre', 'desc');
    }

    //console.log(data)
    if(data){
        e.reply('all:sector:response',JSON.stringify(data))
    }
})

ipcMain.on('sectorByZona',async(e,args)=>{
    let data = await conexion.knex('mt_sector')
                .leftJoin('mt_zona_mt_sector', 'mt_zona_mt_sector.sector_id', 'mt_sector.nombre')
                .where('mt_zona_mt_sector.zona_id', args)
                .orderBy('mt_sector.nombre');

    //console.log(data)
    if(data){
        e.reply('sectorByZona:response',JSON.stringify(data))
    }
})



