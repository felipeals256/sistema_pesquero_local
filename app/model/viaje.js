class Viaje {

    id=null
    tripcode=null
    declaracion=null
    mt_subsistema_id=null
    mt_bote_id=null
    fecha=null
    temporada=null
    n_trampas_agua=null
    n_trampas_visitadas=null
    mt_especie_id=null
    comentario=null
    finalizado=false
    enviado=false
    enviado_fecha=null
    user_created=null
    user_updated=null


    constructor(declaracion=null, mt_subsistema_id=null, mt_bote_id=null, fecha=null, temporada=null, n_trampas_agua=null, n_trampas_visitadas=null, mt_especie_id=null, comentario=null ,finalizado=null  ,enviado=null  ,enviado_fecha=null  ) {
        this.declaracion=declaracion
        this.mt_subsistema_id=mt_subsistema_id
        this.mt_bote_id=mt_bote_id
        this.fecha=fecha
        this.temporada=temporada
        this.n_trampas_agua=n_trampas_agua
        this.n_trampas_visitadas=n_trampas_visitadas
        this.mt_especie_id=mt_especie_id
     
        this.comentario=comentario
        this.finalizado=finalizado?finalizado:this.finalizado
        this.enviado=enviado?enviado:this.enviado
        this.enviado_fecha=enviado_fecha
    }

    generarTripcode(codigo_subsistema,bote_matricula,fecha){
        this.tripcode=codigo_subsistema+bote_matricula+"_"+fecha
    }


}
            
module.exports= Viaje