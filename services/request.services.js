const url='http://192.168.1.103:3000'

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
  }

}

export default request