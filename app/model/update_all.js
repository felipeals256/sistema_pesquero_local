class UpdateAll {

    codigo='update_bdd'
    p_value=null
    s_value=null
    t_value=null

  

    constructor(p_value,s_value,t_value) {
        this.codigo      ='update_bdd'
        this.p_value     =p_value?p_value:'init'
        this.s_value     =s_value
        this.t_value     =t_value
    }

    getFinish(){
        return 'finish'
    }

    getInit(){
        return 'init'
    }

}
            
module.exports= UpdateAll