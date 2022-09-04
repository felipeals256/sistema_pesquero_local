class User {

    id = null
    is_superuser=null
    username=null
    first_name=null
    last_name=null
    email=null
    pass_local=null
    user_type_id=null
    is_active=null

    constructor(id=null, is_superuser=null, username=null, first_name=null, last_name=null, email=null, pass_local=null, user_type_id=null, is_active=null, user_type_codigo=null, user_type_nombre=null   ) {
        this.id=id
        this.is_superuser=is_superuser
        this.username=username
        this.first_name=first_name
        this.last_name=last_name
        this.email=email
        this.pass_local=pass_local
        this.user_type_id=user_type_id
        this.is_active=is_active

        this.user_type={
            id:null,
            codigo:null,
            nombre:null
        }
        this.user_type.id=id
        if(user_type_codigo){
            this.user_type.codigo=user_type_codigo
        }
        if(user_type_nombre){
            this.user_type.nombre=user_type_nombre
        }
    }

    user_type=null

    getNombreCompleto(){
        return (this.first_name+" "+this.last_name).toUpperCase()
    }

    getTipoUsuario(){
        return this.user_type? this.user_type.nombre.toUpperCase():""
    }


}
            
module.exports= User