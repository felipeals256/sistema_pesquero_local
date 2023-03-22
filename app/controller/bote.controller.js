
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')


ipcMain.on('new:bote', async (e,args)=>{

    const bote = new Bote(args);
    data = await bote.save();

    if(data){
        e.reply('new:bote:response',JSON.stringify(data))
    }
    
});

/*
ipcMain.on('all:bote',async(e,args)=>{

    let data = await conexion.knex("mt_bote").select()

    if(data){
        e.reply('all:bote:response',JSON.stringify(data))
    }
});
*/

ipcMain.on('all:bote',async(e,args)=>{

    let data = await conexion.knex('mt_bote')
                .leftJoin('bote_vigencia', 'mt_bote.id', 'bote_vigencia.mt_bote_id')
                .leftJoin('mt_subsistema', 'mt_subsistema.id', 'bote_vigencia.mt_subsistema_id')
                .select(
                        "mt_bote.id as bote_id"
                        ,"mt_bote.matricula as bote_matricula"
                        ,"mt_bote.nombre as bote_nombre"

                        ,"mt_subsistema.codigo as subsistema_codigo"
                        ,"mt_subsistema.descripcion as subsistema_descripcion"

                        ,"bote_vigencia.fecha_termino"
                        )
                .orderBy('mt_bote.matricula', 'asc');

    //console.log(data)
    if(data){
        e.reply('all:bote:response',JSON.stringify(data))
    }

});

//obtiene los botes vigentes
ipcMain.on('find:subsistema_bote',async(e,args)=>{
    
    let data = await conexion.knex('mt_bote')
                .leftJoin('bote_vigencia', 'mt_bote.id', 'bote_vigencia.mt_bote_id')
                .leftJoin('mt_subsistema', 'mt_subsistema.id', 'bote_vigencia.mt_subsistema_id')
                .select(
                        "mt_bote.*"
                        )
                
                .whereRaw(" ( bote_vigencia.fecha_termino >= date('now') or bote_vigencia.fecha_termino is null )" )
                .andWhere('mt_subsistema.id',args)
                .orderBy('mt_bote.matricula', 'asc');

    //console.log(data)
    if(data){
        e.reply('find:subsistema_bote:response',JSON.stringify(data))
    }

});


