import { createContext } from "react"
import { useProvideAuth } from "../hooks";

const initial={
    user:null,
    login:()=>{},
    logout:()=>{},
    loading:true,
    updateUser:()=>{},
    updateUserFriends:()=>{}

}

//here we created the Authcontext it provides the authincation infromation to any of component which is in need and 
//initial it with 4 properties like:-user,login,logout ,loading ,so by this we provide this information to any component only by createContext func of react
export const AuthContext=createContext(initial);

//here created authProvider func which pass the childern as prop now all other component use is props 
export const AuthProvider=({children})=>{
    const auth=useProvideAuth();//now here we created useProvideAuth as custom hooks so now it has value of all of AuthContext (user,login,logot..) 
    //which is return by Authprovide func
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>//here by using AuthContext.Provider we can pass props (auth ) to all this following chideren which ever are wrapped inside of it

}