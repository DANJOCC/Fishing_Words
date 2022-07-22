const url='https://fishingwords.herokuapp.com'
const dev='http://192.168.1.103:3000'
const request={
    singUp:async(data)=>{
        const response = await fetch(dev + "/signUp", {
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
    logIn:async(data)=>{
      const response = await fetch(dev + "/login", {
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
  getProfile:async(username, token)=>{
    const response = await fetch(dev + "/profile?"+new URLSearchParams({username}), {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      let responseWithStatus=await response.json()
      responseWithStatus={...responseWithStatus, status:response.status}
      return responseWithStatus
},
getCheckTlf:async(tlf, token)=>{
  const response = await fetch(dev + "/isRegisterTlf?"+new URLSearchParams({tlf}), {
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