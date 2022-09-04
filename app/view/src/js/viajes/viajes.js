const {ipcRenderer} = require('electron')

function viajes_cambiar(vista,elemento){

    $("#viaje").hide()
    $("#trampas").hide()
    $("#carnadas").hide()
    $(".pointer").removeClass("active")
    $(".pointer").addClass("text-white")

    if(vista=="viaje"){
      $("#viaje").show()
      $("#btn_viaje").addClass("active")
      $("#btn_viaje").removeClass("text-white")
    }
    if(vista=="trampas"){
      $("#trampas").show()
      $("#btn_trampas").addClass("active")
      $("#btn_trampas").removeClass("text-white")
    }
    if(vista=="carnadas"){
        
      $("#carnadas").show()
      $("#btn_carnadas").addClass("active")
      $("#btn_carnadas").removeClass("text-white")
    }
  }



//




var botes=[]


//subsistemas
ipcRenderer.send('all:subsistema')
ipcRenderer.on('all:subsistema:response',(e,args)=>{
    const  subsistemas=JSON.parse(args)
    //console.log(subsistemas)
    for (let i = 0; i < subsistemas.length; i++) {
      $('#subsistema').append('<option data-object="'+_codificar(subsistemas[i])+'" value="'+subsistemas[i].id+'">'+subsistemas[i].codigo+" - "+subsistemas[i].descripcion+'</option>')
    }
})

//especies
ipcRenderer.send('all:especie')
ipcRenderer.on('all:especie:response',(e,args)=>{
    const  especie=JSON.parse(args)
    //console.log(especie)
    for (let i = 0; i < especie.length; i++) {
    $('#especie').append('<option value="'+especie[i].id+'"   '+(especie[i].defecto?"selected=\"\"":"")+'  >'+especie[i].nombre+'</option>')
    }
})

//bycatch
let  bycatch=[]
ipcRenderer.send('all:bycatch')
ipcRenderer.on('all:bycatch:response',(e,args)=>{
    bycatch=JSON.parse(args)
    //console.log(bycatch)
    
})



function viajes_seleccionarSubsistema(bote_id=null){
    id_subsistema = $("#subsistema").val()
    
    
    if(!id_subsistema){
      return;
    }

    ipcRenderer.send('find:subsistema_bote',id_subsistema)

    ipcRenderer.on('find:subsistema_bote:response',(e,args)=>{

      if(!bote_id){
        ipcRenderer.removeAllListeners()
      }
      if(JSON.parse(args)){
        botes=[]
        var botes=JSON.parse(args)
        //console.log(botes)
        $('#bote').find('option').remove();
        $('#bote').append('<option value="">Seleccione...</option>')
        for (let i = 0; i < botes.length; i++) {
            $('#bote').append('<option data-object="'+_codificar(botes[i])+'" value="'+botes[i].id+'">'+botes[i].matricula+" - "+botes[i].nombre+'</option>')
        }
        if(bote_id){
          $("[name=mt_bote_id] option[value="+ bote_id +"]").attr("selected",true);
        }
      }

      //en el onchangue de <select id="subsistema" no se envia bote...es ahí donde queremos que esta función se ejecute
      if(bote_id==null){
        sectores_agregar_datos()
      }
      
    })

}




function viajes_cambioFecha(elemento){
    fecha=null
    if($(elemento).val())fecha = _getFecha($(elemento).val())
    if(!fecha)return;

   fecha[1]<10?$("#viaje_temporada").val(fecha[2]-1):$("#viaje_temporada").val(fecha[2])

}





function sectores_agregar_datos(trampa_historico=null){

  subsistema=_getDecodificarOption("#subsistema","object")

  
  ipcRenderer.send('all:sector',{subsistema_id:subsistema.id})
  ipcRenderer.on('all:sector:response',(e,args)=>{

      //elimina los eventos creados
      if(!trampa_historico){
          ipcRenderer.removeAllListeners()
      }

      $(".sector").children().remove()
      //sector = $(elemento).parent().parent().parent().find(".sector")
      sectores=[]
      var sectores=JSON.parse(args)
      //console.log(sectores)
      $(".sector").append('<option value="">Seleccione...</option>')
      $(".sector").append('<option value="otro">Otro Sector</option>')
      for (let i = 0; i < sectores.length; i++) {
          $(".sector").append('<option value="'+sectores[i].id+'">'+sectores[i].nombre+'</option>')
      }

      

      $(".sector").select2();

      //si existen trampas es por que está editando
      //console.log(trampa_historico)
      if(trampa_historico){
          for (let i = 0; i < trampa_historico.length; i++) {
              const trampa = trampa_historico[i];
              if(trampa.mt_sector_id){
                  $($(".trampas")[i]).find('.select2-selection__rendered').text(trampa.sector)//es el texto del del select del sector
                  $($(".trampas")[i]).find("[name=mt_sector_id] option[value="+( trampa.mt_sector_id?trampa.mt_sector_id:'')+"]").attr("selected",true);
              }else{
                  $($(".trampas")[i]).find('.select2-selection__rendered').text("Otro Sector")
                  $($(".trampas")[i]).find("[name=mt_sector_id] option[value=otro]").attr("selected",true);
                  trampas_cambio_sector( $($($(".trampas")[i]).find("[name=mt_sector_id]"))[0] )
                  $($(".trampas")[i]).find("[name=otro_sector]").val(trampa.otro_sector)
              }

              $($(".trampas")[i]).find("[name=ventana_escape] option[value="+( trampa.ventana_escape?(trampa.ventana_escape?'si':'no'):'na' )+"]").attr("selected",true);
              $($(".trampas")[i]).find("[name=num_comercial]").val((trampa.num_comercial?trampa.num_comercial:'na'))
              $($(".trampas")[i]).find("[name=num_no_comercial]").val((trampa.num_no_comercial?trampa.num_no_comercial:'na'))
              $($(".trampas")[i]).find("[name=bycatch_id] option[value="+( trampa.bycatch_id?trampa.bycatch_id:'na' )+"]").attr("selected",true);
              $($(".trampas")[i]).find("[name=bycatch_cantidad]").val((trampa.bycatch_cantidad?trampa.bycatch_cantidad:'na'))
              $($(".trampas")[i]).find("[name=observaciones]").val(trampa.observaciones)
              
              bycatch=$($(".trampas")[i]).find("[name=bycatch_id]")
              trampas_cambio_bycatch(bycatch[0])
          }
      }
  })
}
