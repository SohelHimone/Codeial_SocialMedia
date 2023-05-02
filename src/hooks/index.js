import { useContext, useEffect, useState } from "react"
import jwt from 'jwt-decode';
import { AuthContext } from "../providers/AuthProvider";
import { editProfile, fetchUserFreind, login as userLogin } from '../api';
import { signup as register ,getPosts} from "../api";
import { setItemlocalStoage,Local_token_key, removeItemFromlocalStoage, getItemFromlocalStoage } from "../utils";
import { postContext } from "../providers/PostsProvider";



//here we created useAuth hooks by useContext so we dont need to write or call the useContext(AuthContext) regualry ,
//this useContext(AuthContext) is comming 
//form authprovder where we creted the authcontext with its inital like user,login,logout
export const useAuth=()=>{
    return useContext(AuthContext);
}


export const useProvideAuth=()=>{
   
    const [user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const getUser=async ()=>{
            const userToken = getItemFromlocalStoage(Local_token_key);

          if(userToken){
            const user=jwt(userToken);
            const response=await fetchUserFreind();
            let friends=[];
            if(response.success){
                friends=response.data.friends;
            }
            setUser({
                ...user,
                friends,
            });
        }
        setLoading(false);
        }
        getUser();
       
    },[])
    
    
    const updateUser=async (userid,name,password,ConfirmPasword)=>{
        const response= await editProfile(userid,name,password,ConfirmPasword);
        if(response.success){
            console.log(response)
            setUser(response.data.user)//setting user as user from data

            setItemlocalStoage(Local_token_key,response.data.token? response.data.token:null);//updating token in localStorage again so would show updated user
            return{
                success:true,
            }
            
        }
        else{
            return{
                success:false,
                message:response.message
            } 
        }
    }


    const login=async (email,password)=>{
        const response= await userLogin(email,password);
        if(response.success){
            setUser(response.data.user)//setting user as user from data

            
            //to here passing the key as Local_token_key(which we set in constans as key) and value as (data.token) 
            //if it not exists the we pass null as value
            setItemlocalStoage(Local_token_key,response.data.token? response.data.token:null);
            return{
                success:true,
            }
            
        }
        else{
            return{
                success:false,
                message:response.message
            } 
        }
    }

    const signup = async (name,email,password,ConfirmPasword)=>{
        const response =await register(name,email,password,ConfirmPasword);

        if(response.success){
            return{
                success:true
            }
        }
        else{
            return{
                success:false,
                message:response.message
            }
        }
    }

    const logout =()=>{
       setUser(null);//so when user logout again again set as null

       removeItemFromlocalStoage(Local_token_key);//here we passing this loacl_token_key so it would remove it from loaclstroage
    }


    const updateUserFriends=(addfriend,friend)=>{
        console.log('new friend',friend)
        if(addfriend){
            setUser({
                ...user,
                friends:[...user.friends,friend]
            });
            return;
        }
        const newfriend= user.friends.filter((f)=>f.to_user?._id!==friend.to_user?._id)
        setUser({
            ...user,
            friends:newfriend
        })

    }

    return{
        user,
        loading,
        login,
        logout,
        signup,
        updateUser,
        updateUserFriends,
        
    }
}



//here we created usePost hooks by useContext so we dont need to write or call the useContext(postContext) regualry ,
//this useContext(postContext) is comming 
//form postsprovider where we creted the postcontext with its inital like posts,loading
export const usePost=()=>{
    return useContext(postContext);
}


export const useProvidePost=()=>{
   
    const [posts,setPosts]=useState(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchPosts=async ()=>{
        const response=await getPosts();
        console.log('response',response);
        if(response.success){
          setPosts(response.data.posts);
        }
        setLoading(false);
        
      }   
      fetchPosts(); 
     
    },[]);

    const UpdatePost=(post)=>{
        const newPosts=[post,...posts];

     
        setPosts(newPosts);
    }

    const addComment= (comment,postId)=>{
        console.log('postid',typeof postId);
        console.log('posts comment',posts)
       const newposts= posts.map((post)=>{
        if(post._id===postId){
            return {
                ...post,
                comments:[comment,...post.comments]
            }
        }
        return post
       })
       setPosts(newposts);
    }

    return{
        data:posts,
        loading,
        UpdatePost,
        addComment,
        
    }

}