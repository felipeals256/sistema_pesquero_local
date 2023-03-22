
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')





ipcMain.on('get:update_all',async(e,args)=>{

    let data = await  conexion.knex.select('*').from('config').where('codigo', 'update_bdd')

    //console.log(data)
    if(data){
        if(data.length==0){
            data=null
        }
        e.reply('get:update_all:response',JSON.stringify(data[0]))
    }
})

