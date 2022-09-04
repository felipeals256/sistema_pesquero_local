
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')


ipcMain.on('save:trampa_historico',async(e,args)=>{

    let data = null
    if(args.id == null || args.id==0 ){
        data = await conexion.knex('trampa_historico').insert(args)
    }else{
        data = await conexion.knex('trampa_historico').update(arg).where('id',args.id)  
    }
    

    //console.log(data)
    if(data){
        e.reply('save:trampa_historico:response',JSON.stringify(data))
    }
})



