import { API_URLS, GetFromBody, Local_token_key } from "../utils";

const customfetch=async (url,{body,...customConfig})=>{

    const token=window.localStorage.getItem(Local_token_key);

    const headers={
        "Content-Type": "application/x-www-form-urlencoded"
    }

    if(token){
        headers.Authorization =  `Bearer ${token}`;
    }
    const Config={
       ...customConfig,
       headers:{
        ...headers,
        ...customConfig.headers,
       } 
    }

    if(body){
       Config.body= GetFromBody(body);//which created the fuction getformBody which will convert our content-type in urlencoded form
    }

    try{
        const response= await fetch(url,Config);
        const data= await response.json();
          console.log('custom fetch f-data',data)
        if(data.success){

            return{
                data: data.data,
                success: true
            }
        }

        throw new Error(data.message);
    }catch(error){
        console.log(error)
        return{
            message:error.message,
            success: false
        }
    }

}

export const getPosts=(page =1,limit=5)=>{
    return customfetch(API_URLS.posts(page,limit),{
       method:'GET',
    });
}


export const login=(email,password)=>{
    return customfetch(API_URLS.login(),{
        method:'POST',
        body:{email,password}
    });
}

export const signup=(name,email,password,confirmPassword)=>{
    return customfetch(API_URLS.signup(),{
        method:'POST',
        body:{name,email,password,confirm_password: confirmPassword}
    });
}

export const editProfile=(userid,name,password,confirmPassword)=>{
     return customfetch(API_URLS.editUser(),{
        method:'POST',
        body:{id:userid,name,password,confirm_password: confirmPassword}
     })
}

export const UserInfo=(userId)=>{
    return customfetch(API_URLS.userInfo(userId),{
        method:'GET',
    });
}

export const fetchUserFreind=()=>{
    return customfetch(API_URLS.friends(),{
        method:'GET',
    });
}

export const addFreind=(userId)=>{
    return customfetch(API_URLS.createFriendship(userId),{
        method:'POST',
    });
}


export const RemoveFreind=(userId)=>{
    return customfetch(API_URLS.removeFriend(userId),{
        method:'POST',
    });
}

export const addPost=(content)=>{
    return customfetch(API_URLS.createPost(content),{
        method:'POST',
        body:{
            content,
        }
    });
}


export const AddComment=(content,postId)=>{
    return customfetch(API_URLS.comment(),{
        method:'POST',
        body:{
            content,
            post_id:postId
        }
    });
}

export const Searchuser=(searchText)=>{
    return customfetch(API_URLS.searchUsers(searchText),{
        method:'GET'
    });
}