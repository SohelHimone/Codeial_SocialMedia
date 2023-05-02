import { useState } from 'react';
import {useAuth} from '../hooks'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings=()=>{
    const auth=useAuth();
    const [editmode,setEditmode]=useState(false);
    const [name,setName]=useState(auth.user?.name?auth.user.name:'');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [savingForm,setSavingForm]=useState(false);
    

    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
      };


    const updateprofile=async ()=>{
        setSavingForm(true);
        let error=false;

        if(!name  || !password || !confirmPassword) {
             toast.error('Please Enter all Details for Profile Update');
            error=true;
        }
        

        if(password !== confirmPassword){
             toast.error('Password and Confirm Password Should be Same');
            error=true;
        }
        
        if(error){
           return setSavingForm(false);
        }

        const response= await auth.updateUser(auth.user._id,name,password,confirmPassword);
        console.log(response);
        if(response.success){
            setEditmode(false);
            setSavingForm(false);
            clearForm();
              toast.success('Profile Updated Sucessfully!!');
        }

        else{
             toast.error(response.message);
        }
        setSavingForm(false);
    }

   return (
    <div style={styles.SettingForm}>
        <div style={styles.SignupHeader}>
        <span>Update Profile</span>
        </div>
        
        <div style={styles.SettingFeild}>
           <div style={styles.label}>Email</div>
           <div style={styles.SettingFeild}>{auth.user?.email}</div>
        </div>
        <div style={styles.SettingFeild}>
            <div style={styles.label}>Name</div>
            {editmode ?(
             <input style={styles.input} type='text'
             value={name}
             onChange={(e)=>setName(e.target.value)}/>
            ):(
                <div>{auth.user?.name}</div>
            )}
          
        </div>

        {editmode && (
            <>
            <div style={styles.SettingFeild}>
                <div style={styles.label}>Password</div>
              <input style={styles.input} type='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div style={styles.SettingFeild}>
                <div style={styles.label}>confirm Password</div>
              <input style={styles.input} type='Password'
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            </>
        )}
        <div style={styles.SettingFeild}>
            {editmode?(
                <>
                  <button style={styles.EditBtn} 
                  onClick={updateprofile}>
                    {savingForm?'Saving Profile ...':'Save Profile'}
                    </button>
                    <button style={styles.EditBtn} 
                      onClick={()=>setEditmode(false)}>
                    Go back
                    </button>
                </>
              
            ):(
                <button style={styles.EditBtn}
                onClick={()=>setEditmode(true)}>
                    Edit Profile
                </button>
            )}
         
        </div>
    </div>
   )

}


const styles={
    SettingForm:{
        width:"30%",
        height:'auto',
        display:'block',
        flexDirection:'column',
        margin: "0 auto",
        marginTop: "50px",
        backgroundColor:'white',
        border:'1px solid black',
        // margin:'40px auto',
        padding:20
    },
    SignupHeader:{
       fontSize:30,
       fontWeight:600,
       color:'orange',
       textAlign:'center'
    },
    input:{
      width:'100%',
      height: 30,
      padding:5,
      fontSize:15
    },
    SettingFeild:{
        width:400,
        display:'block',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
            
    },
    EditBtn:{
        width:'25%',
        height:40,
        display:'block',
        flexDirection:'row',
        border:'1px solid black',
        backgroundColor:'orange',
        marginTop:30,
        cursor:'pointer'
    },
    label:{
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: 16,
        color:" #9e9e9e",
        padding: "5px 0"
    }
}


export default Settings;