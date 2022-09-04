var axios = require('axios');

function get(name,pk=""){
    
    var data = '';

    var conf = {
        method: 'get',
        url: `${process.env.API_HOST}${name}/${pk}`,
        headers: {
            "x-api-key": `${process.env.TOKEN}`
        },
        data : data
    };


   return axios(conf)

}



module.exports.get = get;
