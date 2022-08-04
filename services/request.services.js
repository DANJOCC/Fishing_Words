const url='https://fishingwords.herokuapp.com'
const dev='http://192.168.1.103:3000'

//funciones para http requests

const request={
    singUp:async(data)=>{//registro
        const response = await fetch(url + "/signUp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
          });
        
          let responseWithStatus= await response.json()
          responseWithStatus={...responseWithStatus, status:response.status}
          return responseWithStatus
    },
    logIn:async(data)=>{//ingreso
      const response = await fetch(url + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data)
        });
        let responseWithStatus=await response.json()
        responseWithStatus={...responseWithStatus, status:response.status}
        return responseWithStatus
  },
  getProfile:async(username, token)=>{//obtener perfil
    const response = await fetch(url + "/profile?"+new URLSearchParams({username}), {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      let responseWithStatus=await response.json()
      responseWithStatus={...responseWithStatus, status:response.status}
      return responseWithStatus
},
getCheckTlf:async(tlf, token)=>{//chequear telefonos existentes de jugadores en base de datos
  const response = await fetch(url + "/isRegisterTlf?"+new URLSearchParams({tlf}), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
    });
    let responseWithStatus=await response.json()
    responseWithStatus={...responseWithStatus, status:response.status}
    return responseWithStatus
}

}

export default request