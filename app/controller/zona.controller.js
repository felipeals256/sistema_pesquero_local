
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')


ipcMain.on('all:zona',async(e,args)=>{

    let data = await conexion.knex('mt_zona')
                .orderBy('mt_zona.codigo', 'desc');

    //console.log(data)
    if(data){
        e.reply('all:zona:response',JSON.stringify(data))
    }
})