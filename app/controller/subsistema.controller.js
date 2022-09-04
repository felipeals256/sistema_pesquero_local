
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')


ipcMain.on('new:subsistema', async (e,args)=>{

    const subsistema = new Subsistema(args);
    data = await subsistema.save();

    if(data){
        e.reply('new:subsistema:response',JSON.stringify(data))
    }
    
});


ipcMain.on('all:subsistema',async(e,args)=>{

    let data = await conexion.knex('mt_subsistema')
                .orderBy('mt_subsistema.descripcion', 'desc');

    //console.log(data)
    if(data){
        e.reply('all:subsistema:response',JSON.stringify(data))
    }
})

ipcMain.on('all_info:viaje',async(e,args)=>{
    //console.log(args)
    let data = await conexion.knex('mt_subsistema').where('id',args).limit(1);

    //console.log(data)
    if(data){
        e.reply('all_info:viaje:response',JSON.stringify(data))
    }
})



