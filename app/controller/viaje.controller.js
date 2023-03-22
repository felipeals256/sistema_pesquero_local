
const {ipcMain} = require('electron');
const conexion  = require('../env/bdd')
const {newDate}  = require('../env/utility')
const { localStorage } = require('electron-browser-storage');

ipcMain.on('save:viaje',async(e,args)=>{
    
    user = await localStorage.getItem("user");
    user = JSON.parse(user)
 
    if(!args.actualizar){
        data = await conexion.knex('viaje').whereNull('viaje.deleted_at').andWhere("tripcode",args.viaje.tripcode)
    
        if(data.length==0){

            args.viaje.created_at=newDate()
            args.viaje.updated_at=newDate()
            args.viaje.user_created = user.id
            args.viaje.user_updated = user.id
            viaje_id = await conexion.knex('viaje').insert([args.viaje]).then(row => {return row[0]});

            if(JSON.stringify(viaje_id)){
                if(args.list_trampas_historicas.length>0){
                    for (let th = 0; th < args.list_trampas_historicas.length; th++) {
                        args.list_trampas_historicas[th].viaje_id=viaje_id
                        args.list_trampas_historicas[th].created_at=newDate()
                        args.list_trampas_historicas[th].updated_at=newDate()
                    }
                    data = await conexion.knex('trampa_historico').insert(args.list_trampas_historicas)
                }
                if(args.list_carnadas.length>0){
                    for (let c = 0; c < args.list_carnadas.length; c++) {
                        args.list_carnadas[c].viaje_id=viaje_id;
                        args.list_carnadas[c].created_at=newDate()
                        args.list_carnadas[c].updated_at=newDate()
                    }
                    data = await conexion.knex('carnada_registro').insert(args.list_carnadas)
                }
            }
            e.reply('save:viaje:response',JSON.stringify({status:1}))

        }else{
            e.reply('save:viaje:response',JSON.stringify({status:0}))
        }

    }else{

        args.viaje.updated_at=newDate()
       
        args.viaje.user_updated  = user.id
        delete args.viaje.user_created //lo eliminamos para que no lo actualice

        viaje = await conexion.knex('viaje').update(args.viaje).where("id",args.viaje.id)
        
        data = await conexion.knex('trampa_historico').havingNull('deleted_at').where('viaje_id', args.viaje.id).update({'deleted_at':newDate()})
        data = await conexion.knex('carnada_registro').havingNull('deleted_at').where('viaje_id', args.viaje.id).update({'deleted_at':newDate()})

        if(args.list_trampas_historicas.length>0){
            for (let th = 0; th < args.list_trampas_historicas.length; th++) {
                args.list_trampas_historicas[th].created_at=newDate()
                args.list_trampas_historicas[th].updated_at=newDate()
            }
            data = await conexion.knex('trampa_historico').insert(args.list_trampas_historicas)
        }
        if(args.list_carnadas.length>0){
            for (let c = 0; c < args.list_carnadas.length; c++) {
                args.list_carnadas[c].created_at=newDate()
                args.list_carnadas[c].updated_at=newDate()
            }
            data = await conexion.knex('carnada_registro').insert(args.list_carnadas)
        }
           

        e.reply('save:viaje:response',JSON.stringify({status:2}))
    }
    
    
    

    
})


ipcMain.on('all:viaje',async(e,args)=>{

    let data = await conexion.knex('viaje').whereNull('viaje.deleted_at')
                .select('viaje.*','mt_bote.matricula as mt_bote_matricula','mt_bote.nombre as mt_bote_nombre','mt_subsistema.codigo as mt_subsistema_codigo','mt_subsistema.descripcion as mt_subsistema_descripcion')
                .leftJoin('mt_bote','mt_bote.id','viaje.mt_bote_id')
                .leftJoin('mt_subsistema','mt_subsistema.id','viaje.mt_subsistema_id')
                .orderBy('viaje.id', 'desc');

    //console.log(data)
    if(data){
        e.reply('all:viaje:response',JSON.stringify(data))
    }
})

//Se utiliza en la vista del reporte
ipcMain.on('all_info:viaje',async(e,args)=>{

    let viaje = await conexion.knex('viaje').where('id',args).limit(1);
    if(viaje.length>0){

        viaje=viaje[0]

       

        viaje.bote=null
        if(viaje.mt_bote_id){
            let bote = await conexion.knex('mt_bote').where('id',viaje.mt_bote_id).limit(1);
            if(bote.length>0){
                viaje.bote=bote[0]
            }
        }
        viaje.subsistema=null
        if(viaje.mt_subsistema_id){
            let subsistema = await conexion.knex('mt_subsistema').where('id',viaje.mt_subsistema_id).limit(1);
            if(subsistema.length>0){
                viaje.subsistema=subsistema[0]
            }
        }
        viaje.especie=null
        if(viaje.mt_especie_id){
            let especie = await conexion.knex('mt_especie').where('id',viaje.mt_especie_id).limit(1);
            if(especie.length>0){
                viaje.especie=especie[0]
            }
        }
        viaje.trampa_historico=[]
        let trampa_historico = await conexion.knex('trampa_historico').select('trampa_historico.*','mt_sector.nombre as sector','mt_especie.nombre as bycatch_nombre','mt_especie.id as bycatch_id','mt_zona.descripcion as mt_zona_descripcion')
                                                .leftJoin('mt_sector','mt_sector.id','trampa_historico.mt_sector_id')
                                                .leftJoin('mt_zona','mt_zona.id','trampa_historico.mt_zona_id')
                                                .leftJoin('mt_especie','mt_especie.id','trampa_historico.bycatch_id')
                                                .where('viaje_id',viaje.id)
                                                .havingNull('trampa_historico.deleted_at')
                                                .groupBy('trampa_historico.id');
        if(trampa_historico.length>0){
            viaje.trampa_historico=trampa_historico
        }

        viaje.carnada_registro=[]
        let carnada_registro = await conexion.knex('carnada_registro').select('carnada_registro.*','mt_unidad.descripcion as unidad','mt_especie.nombre as carnada_nombre','mt_especie.codigo as carnada_codigo')
                                            .leftJoin('mt_unidad','mt_unidad.id','carnada_registro.mt_unidad_id')
                                            .leftJoin('mt_especie','mt_especie.id','carnada_registro.mt_especie_id')
                                            .where('viaje_id',viaje.id)
                                            .havingNull('carnada_registro.deleted_at')
                                            .groupBy('carnada_registro.id');
        if(carnada_registro.length>0){
            viaje.carnada_registro=carnada_registro
        }

        
    }
    //console.log(viaje)
    e.reply('all_info:viaje:response',JSON.stringify(viaje))
})


ipcMain.handle('pendientes:viaje', async (event, args) => {

    let viajes = [...await conexion.knex('viaje').whereNull('viaje.deleted_at').where('enviado',false).limit(300)];
    if(JSON.stringify(viajes) && viajes.length==0)return [];

    for (let v = 0; v < viajes.length; v++) {
        let viaje = viajes[v];
        viaje.bote=null
        if(viaje.mt_bote_id){
            let bote = await conexion.knex('mt_bote').where('id',viaje.mt_bote_id).limit(1);
            if(bote.length>0){
                viaje.bote=bote[0]
            }
        }
        viaje.subsistema=null
        if(viaje.mt_subsistema_id){
            let subsistema = await conexion.knex('mt_subsistema').where('id',viaje.mt_subsistema_id).limit(1);
            if(subsistema.length>0){
                viaje.subsistema=subsistema[0]
            }
        }
        viaje.especie=null
        if(viaje.mt_especie_id){
            let especie = await conexion.knex('mt_especie').where('id',viaje.mt_especie_id).limit(1);
            if(especie.length>0){
                viaje.especie=especie[0]
            }
        }
        viaje.trampa_historico=[]
        let trampa_historico = await conexion.knex('trampa_historico').select('trampa_historico.*','mt_sector.nombre as sector','mt_especie.nombre as bycatch_nombre','mt_especie.id as bycatch_id')
                                                .leftJoin('mt_sector','mt_sector.id','trampa_historico.mt_sector_id')
                                                .leftJoin('mt_especie','mt_especie.id','trampa_historico.bycatch_id')
                                                .where('viaje_id',viaje.id)
                                                .havingNull('trampa_historico.deleted_at')
                                                .groupBy('trampa_historico.id');
        if(trampa_historico.length>0){
            viaje.trampa_historico=trampa_historico
        }

        viaje.carnada_registro=[]
        let carnada_registro = await conexion.knex('carnada_registro').select('carnada_registro.*','mt_unidad.descripcion as unidad','mt_especie.nombre as carnada_nombre','mt_especie.codigo as carnada_codigo')
                                            .leftJoin('mt_unidad','mt_unidad.id','carnada_registro.mt_unidad_id')
                                            .leftJoin('mt_especie','mt_especie.id','carnada_registro.mt_especie_id')
                                            .where('viaje_id',viaje.id)
                                            .havingNull('carnada_registro.deleted_at')
                                            .groupBy('carnada_registro.id');
        if(carnada_registro.length>0){
            viaje.carnada_registro=carnada_registro
        }
        
    }
   
    return JSON.stringify(viajes)
})

ipcMain.handle('enviado:viaje', async (event, args) => {
    //console.log(args)
    if(args && args.length==0){
        
        return JSON.stringify({status:1})

    }else{

     
        let data = await conexion.knex('viaje').update({enviado:true,enviado_fecha:newDate()}).whereIn('id', args);

        
        return JSON.stringify({status:1})
        
    }
})


ipcMain.handle('historico_api:viaje', async (event, args) => {
    api_historico =  await conexion.knex('api_historico').insert(args)
    return api_historico
})


ipcMain.handle('eliminar:viaje', async (event, id_viaje) => {

    user = await localStorage.getItem("user");
    user = JSON.parse(user)
    await conexion.knex('viaje').update({deleted_at:newDate(),updated_at:newDate()}).where('id', id_viaje);
    return true
})
