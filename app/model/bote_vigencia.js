class BoteVigencia {

    codigo=null
    bote_codigo=null
    subsistema_codigo=null
    user_modificador=null
    fecha_termino=null

    constructor(bote_codigo,subsistema_codigo,fecha_termino) {
        this.bote_codigo=bote_codigo
        this.subsistema_codigo=subsistema_codigo
        this.fecha_termino=fecha_termino
    }

    calcArea () {
        return "hola mundo";
    }

}
            
module.exports= BoteVigencia

