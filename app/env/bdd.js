/*
const mongoose = require('mongoose')

const URI = 'mongodb://localhost/sistema_pesquero'

const con = mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(
        db =>{
            console.log('conectado')
        }
    ).catch(
        err=>{
            console.log('error en la conexion')
            console.log(err)
        }
    )

*/


const knex = require('knex')({
    client: 'sqlite3',
    connection: {
    filename: './data.db',
    },
    useNullAsDefault: true
});



async function insert(object,tabla,pk="codigo"){
    /*
    return knex(tabla).insert(object)
    .then( (id) => {
        return knex(tabla).select().where(pk, id)
    }).then( newtask =>{
        return newtask
    })
    .catch(err => {
        throw err
    })
    */
    config = await knex(tabla).insert(object);
    return config;
}

async function update(object,tabla,pk="codigo"){
     
    config =null;
    //Esto lo hagho así ya que en procesos asincronos no puedo declarar variables
    //ya que se sobreescriben

    if(pk == "codigo"){

         
        config = await knex(tabla).where(pk, object.codigo).update( object )
            // .then( editRowNum => {
            //     return editRowNum
            // })
            // .catch(err => {
            //     throw err
            // })


    }else if(pk == "numero"){

         
        config = await knex(tabla).where(pk, object.numero).update( object )
                // .then( editRowNum => {
                //     return editRowNum
                // })
                // .catch(err => {
                //     throw err
                // })

   
    }else{

         
        config = await knex(tabla).where(pk, object.id).update( object )
            // .then( editRowNum => {
            //     return editRowNum
            // })
            // .catch(err => {
            //     throw err
            // })
    }
    return config;
    

   
}


module.exports = {
    knex:knex,
    insert:insert,
    update:update
}