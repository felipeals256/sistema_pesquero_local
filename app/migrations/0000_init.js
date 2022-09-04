const conexion          = require('../env/bdd')
try {
 cargarMaestros();
} catch (error) {
  console.error(error);
}

async function  cargarMaestros(){


    const mt_arte = await conexion.knex.schema.createTable("mt_arte", (table) =>{
                            table.integer('id').primary();
                            table.string('codigo');
                            table.string('descripcion');
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        });


    const mt_bote = await conexion.knex.schema.createTable("mt_bote", (table) =>{
                            table.integer('id').primary();
                            table.integer('matricula');
                            table.string('nombre');
                            table.string('propietario');
                            table.string('materialidad');
                            table.integer('manga');
                            table.integer('eslora');
                            table.string('forma');
                            table.string('rpa');
                            table.string('observaciones');

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        })

    const mt_especie_tipo = await conexion.knex.schema.createTable("mt_especie_tipo", (table) =>{
                            table.integer('id').primary();
                            table.integer('codigo');
                            table.string('descripcion')
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        });

    const mt_especie_mt_especie_tipo = await conexion.knex.schema.createTable("mt_especie_mt_especie_tipo", (table) =>{
                            table.integer('mt_especie_id')
                            table.integer('mt_especie_tipo_id')
                        });

    const mt_especie = await conexion.knex.schema.createTable("mt_especie", (table) =>{
                            table.integer('id').primary();
                            table.string('codigo',5);
                            table.string('nombre');
                            table.string('nombre_cientifico');
                            table.boolean('defecto').defaultTo(false)
                            table.integer('mt_unidad_id');
                            //table.integer('especie_tipo_codigo')
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        });

    const mt_subsistema = await conexion.knex.schema.createTable("mt_subsistema", (table) =>{
                            table.integer('id').primary();
                            table.string('codigo',3);
                            table.string('descripcion')
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        });

    const mt_subsistema_mt_zona = await conexion.knex.schema.createTable("mt_subsistema_mt_zona", (table) =>{
                            table.integer('mt_subsistema_id')
                            table.integer('mt_zona_id')
                        });

    const mt_sector = await conexion.knex.schema.createTable("mt_sector", (table) =>{
                            table.integer('id').primary();
                            table.string('nombre');

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                            
                        });

    const mt_unidad = await conexion.knex.schema.createTable("mt_unidad", (table) =>{
                            table.integer('id').primary();
                            table.integer('codigo');
                            table.string('unidad',5)
                            table.string('descripcion')
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        });

    const mt_zona_sector = await conexion.knex.schema.createTable("mt_zona_mt_sector", (table) =>{
                            table.integer('mt_zona_id')
                            table.integer('mt_sector_id')
                        });

    const mt_zona = await conexion.knex.schema.createTable("mt_zona", (table) =>{
                            table.integer('id').primary();
                            table.integer('codigo');
                            table.string('descripcion')
                            table.integer('mt_subsistema_id')
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                        });

    const bote_vigencia = await conexion.knex.schema.createTable("bote_vigencia", (table) =>{
                            table.integer('id').primary();
                            table.date('fecha_termino')
                            table.integer('mt_bote_id')
                            table.string('mt_subsistema_id')
                            table.integer('user_modificador_id')
                            //table.integer('task_status').notNullable().defaultTo(0)

                            //Campos comunes
                            table.date('fecha_creacion')
                            table.date('fecha_actualizacion')
                            table.integer('user_modificador')
                            table.integer('user_creador')
                            
                        });

    let config = await conexion.knex.schema.createTable("config", (table) =>{
                            table.increments('id');
                            table.string('codigo',20)
                            table.string('p_value');
                            table.string('s_value');
                            table.string('t_value');
                        })
    
    if (JSON.stringify(config)){
        config = await conexion.knex('config').insert({codigo:"INSERT_API",p_value:'si'});
        
    }

  

    
    



    
}