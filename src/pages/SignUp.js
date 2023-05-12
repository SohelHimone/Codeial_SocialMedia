import { useState } from "react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import styles from '../style/signup.module.css';



const SignUp=()=>{
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [confirmpassword,setConfirmPassword]= useState('');
    const [signingUp, setSigningUp] = useState('');
    const auth=useAuth();
    

    const handlesubmit=async (e)=>{
        e.preventDefault();
        setSigningUp(true)

        if(!name || !email || !password || !confirmpassword) {
            return toast.error('Please Enter all Details for SignUp')
        }

        if(password !== confirmpassword){
            return toast.error('Password and Confirm Password Should be Same')
        }
        

        const response= await auth.signup(name,email,password,confirmpassword);

        if(response.success){
            toast.success('SignUp Successfully!');
            setSigningUp(false);
            return <Navigate to="/login" />;
            
        }
        else{
            toast.error(response.message);
            
        }
        setSigningUp(false);

    
    
    }

    if(auth.user){
       return <Navigate to="/" />
    }


    return(
        <form className={styles.Signupform} onSubmit={handlesubmit}>
             <span className={styles.SignupHeader}>Sign Up</span>
            <div className={styles.SignUpFeild}>
                <input  type="text"  
                placeholder="Enter Your name"className={styles.input}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
            </div>
            <div className={styles.SignUpFeild}>
                <input className={styles.input} type="email"  
                placeholder="Enter Your Email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div className={styles.SignUpFeild}>
                <input className={styles.input} type="password"  
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></input>
            </div>
            <div className={styles.SignUpFeild}>
                <input className={styles.input} type="password"  
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></input>
            </div>
            <div className={styles.SignUpFeild}>
            <button className={styles.SignUpBtn} disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
            </div>

        </form>
    )
}

export default SignUp;