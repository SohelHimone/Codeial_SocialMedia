import { useState } from 'react';
import {useAuth} from '../hooks'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../style/settings.module.css';

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
    <div className={styles.SettingForm}>
        <div className={styles.SignupHeader}>
        <span>Update Profile</span>
        </div>
        
        <div className={styles.SettingFeild}>
           <div  className={styles.SettingFeild}>Email</div>
           <div className={styles.label}>{auth.user?.email}</div>
        </div>
        <div className={styles.SettingFeild}>
            <div  className={styles.label}>Name</div>
            {editmode ?(
             <input className={styles.input} type='text'
             value={name}
             onChange={(e)=>setName(e.target.value)}/>
            ):(
                <div>{auth.user?.name}</div>
            )}
          
        </div>

        {editmode && (
            <>
            <div className={styles.SettingFeild}>
                <div  className={styles.label}>Password</div>
              <input className={styles.input} type='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className={styles.SettingFeild}>
                <div  className={styles.label}>confirm Password</div>
              <input className={styles.input} type='Password'
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            </>
        )}
        <div className={styles.SettingFeild}>
            {editmode?(
                <>
                  <button className={styles.EditBtn}
                  onClick={updateprofile}>
                    {savingForm?'Saving Profile ...':'Save Profile'}
                    </button>
                    <button className={styles.EditBtn}
                      onClick={()=>setEditmode(false)}>
                    Go back
                    </button>
                </>
              
            ):(
                <button className={styles.EditBtn}
                onClick={()=>setEditmode(true)}>
                    Edit Profile
                </button>
            )}
         
        </div>
    </div>
   )

}


export default Settings;