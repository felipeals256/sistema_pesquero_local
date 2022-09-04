const fs = require('fs');
//const $ = require('jquery');

let desde = localStorage.getItem("desde");
if(desde){
    
    if(desde.indexOf("?")!=-1){
        //console.log(desde.indexOf("?"))
        desde=desde.substring(0,desde.indexOf("?"))
    }
    btn = $("a[href='"+desde+"']")
    if(!btn)btn = $("a[href='"+desde+"']")
  
    setBody(desde)
}

function _getParametros(){
    const desde = localStorage.getItem("desde");
    if(desde.indexOf("?")==-1)return null;
    params=desde.substring(desde.indexOf("?")+1)
    params='{"'+(params.replace(/=/g,'":"').replace(/&/g,'","'))+'"}'
    return JSON.parse(params)
}


function setBody(path){

    if(path=="#")return;
    //console.log($(elemento))
    let filename = __dirname+"/"+path+"".trim();

    if(fs.existsSync(filename)){
        $("#body").text("")
        let data = fs.readFileSync(filename,'utf8');
        $("#body").append(data)

        
        //$("#sidebarMenu > .nav-link").removeClass('active')
        primero=desde.substring(0, (desde.replace("./","").indexOf("/")+2 ))
        $("#sidebarMenu div ul li .nav-link[href^='"+primero+"']").addClass('active')

        $("a[href^='"+desde+"']").addClass('active')
        $("a[href^='"+desde+"']").removeClass('text-white')
        

    }else{
        console.error("no existe "+filename)
    }
}

//setBody($("#hrefindex"));
//setBody($('<a class="nav-link d-flex justify-content-between" href="./viajes/crear.html">'))

//agrega el evento href a todos los botones
_eventHref()
function _eventHref(elemento=null){

    if(!elemento){
        elemento="[href]";
    }

    $(elemento).click(function(e){
        e.preventDefault()
        localStorage.setItem("desde",$(this).attr('href'))
        window.location.href = window.location.href;
        //setBody($(this));
    });
}

/*
redimencinar()
$(window).resize(function(){
    redimencinar()
});
function redimencinar(){
    const div = $("#body").css('height');
    const hi = $(window).height()-130
    //console.log(div)
    $("#body").css('height',hi)
}

*/

function _fotmatearFecha(fecha){
    if(!fecha)return "";

    fecha=fecha.split("-")
    hora=""
    if(fecha[2].length>4){
        _fecha=fecha[2].split(" ")
        fecha[2]=_fecha[0]
        if(_fecha.length>1){
            hora=_fecha[1].split(":")
            hora = " a las "+hora[0]+":"+hora[1]+" hrs"
        }
    }

    return fecha[2]+"-"+fecha[1]+"-"+fecha[0]+hora
}

function _codificar(data){
    if(!data)return ""
    data = JSON.stringify(data).replace(/"/gi,'&&cod&&')
    
    return data
}
function _decodificar(data){
    if(!data)return null
    data=JSON.stringify(data.replace(/&&cod&&/gi,'"'))
   

    return JSON.parse(JSON.parse(data))
}

//retorna un arreglo con los datos de la fecha d,m,y
//ej:[18, 3, 2022]
function _getFecha(fecha,ceros=false){
    fecha = fecha.replace(/[/]/g,"-")
    fecha = fecha.split("-")
    if(fecha.length!=3)return null

    if(!ceros)return [fecha[0].toString().trim().length==4? Number.parseInt(fecha[2].substring(0,1)=="0"?fecha[2].replace("0",""):fecha[2]): Number.parseInt(fecha[0].substring(0,1)=="0"?fecha[0].replace("0",""):fecha[0])
                        , Number.parseInt(fecha[1].substring(0,1)=="0"?fecha[1].replace("0",""):fecha[1])
                        ,Number.parseInt(fecha[0].toString().trim().length==4?fecha[0]:fecha[2])]

    return [fecha[0].toString().trim().length==4?fecha[2]:fecha[0],fecha[1],fecha[0].toString().trim().length==4?fecha[0]:fecha[2]]
}

function _empty(valor){

    return !valor || valor.toString().trim().length == 0? true: false;
}

function _getDecodificarOption(selector,data){
    var v = _decodificar($(selector).find(':selected').data(data))
    if(!v || v==null || v == undefined){
        return null
    }
    return v
}