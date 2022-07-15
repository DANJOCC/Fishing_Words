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
        
          return response.json()
    }

}

export default request