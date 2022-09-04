class TrampaHistorico {

    id=null
    viaje_id=null
    mt_sector_id=null
    otro_sector=null
    ventana_escape=null
    num_comercial=null
    num_no_comercial=null
    bycatch_id=null
    bycatch_cantidad=null
    observaciones=null

    constructor(viaje_id,mt_sector_id,otro_sector,ventana_escape,num_comercial,num_no_comercial,bycatch_id,observaciones,bycatch_cantidad) {
        this.viaje_id           =viaje_id
        this.mt_sector_id       =mt_sector_id
        this.otro_sector        =otro_sector
        this.ventana_escape     =ventana_escape
        this.num_comercial      =num_comercial
        this.num_no_comercial   =num_no_comercial
        this.bycatch_id         =bycatch_id
        this.bycatch_cantidad   =bycatch_cantidad
        this.observaciones      =observaciones
    }

}
            
module.exports= TrampaHistorico