import { createContext } from "react"
import { useProvidePost } from "../hooks";


const initial={
    posts:[],
    loading:true,
    UpdatePost:()=>{},
    addComment:()=>{}

}

//here we created the Authcontext it provides the authincation infromation to any of component which is in need and 
//initial it with 4 properties like:-user,login,logout ,loading ,so by this we provide this information to any component only by createContext func of react
export const postContext=createContext(initial);

//here created authProvider func which pass the childern as prop now all other component use is props 
export const PostsProvider=({children})=>{
    const post=useProvidePost();//now here we created useProvideAuth as custom hooks so now it has value of all of AuthContext (user,login,logot..) 
    //which is return by Authprovide func
    return <postContext.Provider value={post}>{children}</postContext.Provider>//here by using AuthContext.Provider we can pass props (auth ) to all this following chideren which ever are wrapped inside of it

}