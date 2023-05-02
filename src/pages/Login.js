import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks";//here we use custom hooks so that we can iterate in thier values like login,logout,user,loading which it contains ,more it use for authenicate by those info
import { Navigate } from "react-router";

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
    <form style={styles.LoginForm} onSubmit={handleSubmit}>

        <span style={styles.loginSignupHeader}>Log In</span>
        
        <div style={styles.LoginFeild}>
             <input style={styles.input} 
             type="email" 
             placeholder="Enter Your Email" 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}>
             </input>
        </div>

        <div  style={styles.LoginFeild}>
             <input style={styles.input} 
             type="password" 
             placeholder="Enter Your password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div style={styles.LoginFeild}>
            <button  disabled={loggin}  style={styles.LoginBtn} >{loggin ? 'Logging In':'Log In' }</button>
        </div>

  
    </form>
    
   )
}


const styles={
    LoginForm:{
        width:450,
        height:350,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        border:'1px solid black',
        margin:'40px auto',
        padding:20
    },
    loginSignupHeader:{
       fontSize:30,
       fontWeight:600,
       color:'orange'
    },
    input:{
      width:'100%',
      height: 30,
      marginTop:20,
      padding:5,
      fontSize:15
    },
    LoginFeild:{
        width:400,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
            
    },
    LoginBtn:{
        width:'100%',
        height:40,
        border:'1px solid black',
        backgroundColor:'orange',
        marginTop:30,
    }
}
export default Login;