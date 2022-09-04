let carnadas=[];
let unidades=[];
//unidad
ipcRenderer.send('all:unidad')
ipcRenderer.on('all:unidad:response',(e,args)=>{
    unidades=JSON.parse(args)
    //console.log(unidades)
    input2=$(".carnadas_unidades")
    //for (let i = 0; i < unidades.length; i++) {
    //  $(input2[0]).append('<option value="'+unidades[i].codigo+'">'+unidades[i].descripcion+'</option>')
    //}
})

//carnadas
ipcRenderer.send('all:carnada')
ipcRenderer.on('all:carnada:response',(e,args)=>{
  if(JSON.parse(args)){
    carnadas=JSON.parse(args)
  }
})

function carnadas_selectCarnada(elemento){
    carnada = _decodificar($(elemento).val())
    padre = $(elemento).parent().parent().parent()

    $(padre).find(".carnadas_unidades option").attr("selected",false);
    if(!carnada)return;
    $(padre).find(".carnadas_unidades option[value="+ carnada.mt_unidad_id +"]").attr("selected",true);
}


function htmlCarnadas(){return `
  <div class="carnadas_padre mb-4 card p-3">
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Carnada</label>
      <div class="col-sm-10">
        <select class="carnadas_carnada select2" data-show-subtext="true" data-live-search="true" onchange="carnadas_selectCarnada(this)" name="carnada_mt_especie_id">
          <option value="" >Seleccione...</option>
        </select>
      </div>
    </div>
    
    <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Unidad</label>
        <div class="col-sm-4">
          <select class="carnadas_unidades form form-control" name="mt_unidad_id" >
            <option class="option" value="">Seleccione...</option>
          </select>
        </div>
    </div>
    
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Volumen</label>
      <div class="col-sm-4">
        <input class="form form-control" type="number" name="volumen">
      </div>
    </div>
  </div> 
`};


function carnadas_add(carnada=null){
    let html=htmlCarnadas()
    $('#carnadas').append(html)
    div=$(".carnadas_padre")
    div=div[div.length-1]
    //console.log(carnadas)
    for (let i = 0; i < carnadas.length; i++) {
      $(div).find(".carnadas_carnada").append('<option especie_id="'+carnadas[i].id+'"  value="'+_codificar(carnadas[i])+'">'+carnadas[i].codigo+" - "+carnadas[i].nombre+'</option>')
    }
    i=0
    for (let i = 0; i < unidades.length; i++) {
      $(div).find(".carnadas_unidades").append('<option value="'+unidades[i].id+'">'+unidades[i].descripcion+'</option>')
    }

    $(div).find(".carnadas_carnada").select2();

    if(carnada){
      console.log(carnada)
      if(carnada.mt_especie_id){
        $(div).find('.select2-selection__rendered').text(carnada.carnada_codigo+" - "+carnada.carnada_nombre)
        $(div).find("[name=carnada_mt_especie_id] option[especie_id="+( carnada.mt_especie_id?carnada.mt_especie_id:'')+"]").attr("selected",true);
      }
      $(div).find("[name=mt_unidad_id] option[value="+( carnada.mt_unidad_id?carnada.mt_unidad_id:'')+"]").attr("selected",true);
      $(div).find("[name=volumen]").val(carnada.volumen)

    }
}

function carnadas_quitar(){
    $(".carnadas_padre").last().remove()
}