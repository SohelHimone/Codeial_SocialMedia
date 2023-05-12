import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks";//here we use custom hooks so that we can iterate in thier values like login,logout,user,loading which it contains ,more it use for authenicate by those info
import { Navigate } from "react-router";
import styles from '../style/login.module.css';

const Login=()=>{

   

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loggin,setLoggin]=useState(false);
    const auth=useAuth();
    console.log(auth);
    

    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        setLoggin(true);

        if(!email || !password){
            toast.error('Please Enter Both Email And Password');
           
            return;
        }
          //getting data from login which is exports form api
        const response= await auth.login(email,password);//here auth hooks is used to authinacte the login form, only when the coorect email,passwrd porvided
        if(response.success){
            toast.success('Sucessfully Login!');
            
        }
        else{
            toast.error('Invalid Username or Password!');
            
        }

         setLoggin(false);
      
      }

    if(auth.user){
       return <Navigate to="/" />
    }

    return(
    <form className={styles.LoginForm} onSubmit={handleSubmit}>

        <span className={styles.loginSignupHeader}>Log In</span>
        
        <div className={styles.LoginFeild}>
             <input  className={styles.input} 
             type="email" 
             placeholder="Enter Your Email" 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}>
             </input>
        </div>

        <div className={styles.LoginFeild} >
             <input className={styles.input}
             type="password" 
             placeholder="Enter Your password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div className={styles.LoginFeild} >
            <button  disabled={loggin}  className={styles.LoginBtn} >{loggin ? 'Logging In':'Log In' }</button>
        </div>

  
    </form>
    
   )
}


export default Login;