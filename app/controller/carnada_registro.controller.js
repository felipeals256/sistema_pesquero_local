
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')


ipcMain.on('save:carnada_registro',async(e,args)=>{

    let data = null
    if(args.codigo == null || args.codigo==0 ){
        data = await conexion.knex('carnada_registro').insert(args)
    }else{
        data = await conexion.knex('carnada_registro').update(arg).where('id',args.codigo)  
    }
    

    //console.log(data)
    if(data){
        e.reply('save:carnada_registro:response',JSON.stringify(data))
    }
})



