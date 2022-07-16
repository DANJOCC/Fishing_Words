const url='https://fishingwords.herokuapp.com'

const request={
    singUp:async(data)=>{
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
    logIn:async(data)=>{
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
  getProfile:async(username, token)=>{
    const response = await fetch(url + "/profile?"+new URLSearchParams({username}), {
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