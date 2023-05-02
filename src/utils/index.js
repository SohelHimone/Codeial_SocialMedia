export * from './constants';

//now here we are stoarging or setting  the key and value in loaclstorage so that even after refresh the user donot set to null again,
//but after logout it should be null

export const setItemlocalStoage=(key,value)=>{
  if(!key || !value){
    return console.error('can not set key and value to localstorage');

  }
  const valueTostore= typeof value!=='string'? JSON.stringify(value):value
  console.log(valueTostore)

  return localStorage.setItem(key,valueTostore);
}

export const getItemFromlocalStoage=(key)=>{
    if(!key ){
     return console.error('can not get key from localstorage');
  
    }
    return  localStorage.getItem(key);
  }


  export const removeItemFromlocalStoage=(key)=>{
    if(!key ){
      return console.error('can not get key from localstorage');
  
    }
     return localStorage.removeItem(key);
  }

// here we crated frombody function which will encode the key which is coming form body or user sending it ,
//here params is obejct ehich contain {username,paswprd}
export const GetFromBody=(params)=>{
    let formbody=[];

    for(let property in params){
        let encodedKey= encodeURIComponent(property);//username= user%20name  like this the usernname get encoded
        let encodedValue= encodeURIComponent(params[property]);//something123=something%20123

        formbody.push(encodedKey + '=' + encodedValue); //here with are pushing it in frombody as username=user%20name and something123=something%20123(this would be password)


    }

    return formbody.join('&');//here simply we are join the username and password by &

};

