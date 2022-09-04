
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')





ipcMain.on('all:unidad',async(e,args)=>{

    let data = await conexion.knex('mt_unidad')

    //console.log(data)
    if(data){
        e.reply('all:unidad:response',JSON.stringify(data))
    }
})



