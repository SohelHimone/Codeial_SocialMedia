import { useState } from "react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";



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
        <form style={styles.Signupform} onSubmit={handlesubmit}>
             <span style={styles.SignupHeader}>Sign Up</span>
            <div style={styles.SignUpFeild}>
                <input style={styles.input} type="text"  
                placeholder="Enter Your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
            </div>
            <div style={styles.SignUpFeild}>
                <input style={styles.input} type="email"  
                placeholder="Enter Your Email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div style={styles.SignUpFeild}>
                <input style={styles.input} type="password"  
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></input>
            </div>
            <div style={styles.SignUpFeild}>
                <input style={styles.input} type="password"  
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></input>
            </div>
            <div style={styles.SignUpFeild}>
            <button style={styles.SignUpBtn} disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
            </div>

        </form>
    )
}


const styles={
    Signupform:{
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
    SignupHeader:{
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
    SignUpFeild:{
        width:400,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
            
    },
    SignUpBtn:{
        width:'100%',
        height:40,
        border:'1px solid black',
        backgroundColor:'orange',
        marginTop:30,
    }
}

export default SignUp;