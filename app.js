const {app,BrowserWindow, Menu,ipcMain} = require('electron');
const { localStorage } = require('electron-browser-storage');
const dotenv = require('dotenv')
dotenv.config()
const conexion  = require('./app/env/bdd')

//require('./app/env/bdd')
const init = require('./app/env/controller/init_controller')
const migrar = require('./app/env/controller/migrations')



const url = require('url');
const path = require('path');

// if(process.env.NODE_ENV !== 'production'){
//     require('electron-reload')(__dirname,{
//         //tambien se reinicia si cambio algo en el código
//         electron:path.join(__dirname,'./node_modules','.bin','electron')
//     })
// }

app.on('open-url',()=>{
    console.log("entrando");
})

app.on('web-contenido-creado',()=>{
    console.log("saliendo");
})


migrar.iniciar()//Inicia las migraciones (ojo depende de la conficuracion del env)
init.initConfig()//consulta a las APIs en busca de información


app.on('ready',()=>{
    
    openLogin()
});

ipcMain.handle('login', async (event, argumentos) => {

    let data = await conexion.knex('user')
                    .select('user.*','user_type.codigo as user_type_codigo','user_type.nombre as user_type_nombre')
                    .where("username",argumentos.user).andWhere("pass_local",argumentos.pass)
                    .leftJoin('user_type','user_type.id','user.user_type_id')

    if(data.length>0 && data[0].is_active){
        
        localStorage.setItem('user', JSON.stringify(data[0]))
        .then(() =>{
            openAdmin()
            _ventana_login.close();
        })
        //await sessionStorage.setItem('user',  JSON.stringify(data[0]) );
       
    }else{
        return false
    }
    
})

let _ventana_login  = null;
let _ventana_admin  = null;


function openLogin(){
    
    //inicia la configuración:
    //carga los modelos desde la API

    _ventana_login  = new BrowserWindow({
        width:400,
        minWidth:400,
        height:500,
        title:'Sistema Pesquero',
        center:true,
        maximizable:true,
        webPreferences:{
            nodeIntegration:true,
            webviewTag:true,
            contextIsolation: false
        }
    })

    _ventana_login.loadURL(
        url.format({
            pathname:path.join(__dirname,'app/view/login.html'),
            protocol:'file:',
            slashes:true,
        })
    )
    
    _ventana_login.listeners
    
    
    //si se cierra la ventanaprincipal, se termina la app
    _ventana_login.on('close',()=>{
        if(!_ventana_admin){
            app.quit();
        }
        //
    });


    //Elimino el menú superior
    if(process.env.ENV == 'TEST'){
        Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu));
    }else{
        Menu.setApplicationMenu(null);
    }

    _ventana_login.maximize()
}

function openAdmin(){

    //inicia la configuración:
    //carga los modelos desde la API

    _ventana_admin = new BrowserWindow({
        width:1000,
        minWidth:250,
        height:600,
        title:'Sistema Pesquero',
        center:true,
        maximizable:true,
        webPreferences:{
            nodeIntegration:true,
            webviewTag:true,
            contextIsolation: false
        }
    })

    _ventana_admin.loadURL(
        url.format({
            pathname:path.join(__dirname,'app/view/index.html'),
            protocol:'file:',
            slashes:true,
        })
    )
    
    _ventana_admin.listeners
    
    
    //si se cierra la ventanaprincipal, se termina la app
    _ventana_admin.on('close',()=>{
        app.quit();
    });


    //Elimino el menú superior
    if(process.env.ENV == 'TEST'){
        Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu));
    }else{
        Menu.setApplicationMenu(null);
    }

    _ventana_admin.maximize()
}




const templateMenu =[
    {
        label:"DevTool",
        submenu:[

            {
                label:"Consola",
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            },
        ]

    }
]

require('./app/controller.js')





