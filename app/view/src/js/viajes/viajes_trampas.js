
var zonas=[]

//Limitar el número de langostas a número enteros y positivos.
function cambio_cantidad(element){
    
    if( $("#especie option:selected" ).text().trim().toLowerCase().search("langosta")>-1 ){
        let reg = /\D/g
        const str =  $(element).val().trim()
        const newStr = str.replace(reg, "");

        $(element).val(newStr)
    }

    suma = 0
    $("input[name=num_comercial]").each(function(){
        let value = $(this).val()!=undefined?$(this).val():0
        try {
            suma+=Number.parseInt(value)
        } catch (error) {
            suma+=0
        }
    })

    $("input[name=num_no_comercial]").each(function(){
        let value = $(this).val()!=undefined?$(this).val():0
        try {
            suma+=Number.parseInt(value)
        } catch (error) {
            suma+=0
        }
    })

    $($("[name=total_capturado]")[0]).val(suma)
    
}

function htmlTrampas(numero=0){return `
    <div class="trampas card p-3 mb-4">

        <h6>Trampa #${numero}</h6>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Ventana Escape</label>
            <div class="col-sm-10">
            <select class="form form-control" name="ventana_escape" >
                <option value="">Seleccione...</option>
                <option value="si">Si</option>
                <option value="no">No</option>
                <option value="na">Sin Información</option>
            </select>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">N° Comercial</label>
            <div class="col-sm-10">
                <input class="form form-control" type="text" name="num_comercial" value="" onchange="cambio_cantidad(this)">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">N° No Comercial</label>
            <div class="col-sm-10">
                <input class="form form-control" type="text" name="num_no_comercial" value="" onchange="cambio_cantidad(this)">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Sector</label>
            <div class="col-sm-10">
                <select class="form form-control sector" onchange="trampas_cambio_sector(this)" name="mt_sector_id">
                <option value="">Seleccione...</option>
            </select>
            </div>
        </div>
        <div class="mb-3 row">
            <label  class="col-sm-2 col-form-label">Bycatch</label>
            <div class="col-sm-10">
            <select class="form form-control bycatch" name="bycatch_id" onchange="trampas_cambio_bycatch(this)" >
                <option value="">Seleccione...</option>
            </select>
            </div>
        </div>
        <div class="mb-3 row bycatch_cantidad" style="display:none">
            <label for="staticEmail" class="col-sm-2 col-form-label">Cantidad de Bycatch</label>
            <div class="col-sm-10">
                <input class="form form-control" type="text" name="bycatch_cantidad" value="">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Observación</label>
            <div class="col-sm-10">
            <textarea class="form form-control" name="observaciones"  rows="1"></textarea>
            </div>
        </div>

    </div>
`}

//el proposito de esta función es validar si debemos mostrar que ingrese la cantidad de bycatch
function trampas_cambio_bycatch(elemento){
    $(elemento).parent().parent().parent().find(".bycatch_cantidad").hide()

    if( $(elemento).val() != "" && $(elemento).val() != "na" ){
        $(elemento).parent().parent().parent().find(".bycatch_cantidad").show()
    }
}

function trampas_cambio_sector(elemento){
   
    $(elemento).parent().parent().parent().find(".otro_sector").remove()
    if($(elemento).val()=="otro"){

        $(elemento).parent().parent().after(
            `<div class="mb-3 row otro_sector">
                <label for="staticEmail" class="col-sm-2 col-form-label">Otro Sector</label>
                <div class="col-sm-10 ">
                    <input class="form form-control " name="otro_sector" type="text" value="">
                </div>
            </div>`
        );

    }
}


function trampas_ntrampas(trampa_historico=null){

    valor=$("#ntrampasvisitadas").val();
    //console.log(valor)
    trampas = $("#trampas").find(".trampas");
    $(trampas).remove()
    
    if( valor+"".trim().length>0 ){
        
        valor = Number(valor+"".trim())
        for (let i = 0; i < valor; i++) {
            $("#trampas").append(htmlTrampas(i+1))
        }

        
        
        sectores_agregar_datos(trampa_historico)
        bycatch_agregar_datos()

        
    }


}

function bycatch_agregar_datos(){
    for (let i = 0; i < bycatch.length; i++) {
        $('.bycatch').append('<option value="'+bycatch[i].id+'"   '+(bycatch[i].defecto?"selected=\"\"":"")+'  >'+bycatch[i].nombre+'</option>')
    }
    $('.bycatch').append('<option value="na"  >Sin información</option>')
}



