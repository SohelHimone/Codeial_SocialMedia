import { useEffect, useState } from "react";
import { useNavigate,  useParams } from "react-router-dom";
import { RemoveFreind, UserInfo, addFreind } from "../api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks";
import styles from '../style/userprofile.module.css';



const UserProfile=()=>{
    
    // const location=useLocation();
    // console.log(location)
    // const user = location?.state?.user;//here we use useLocation hook it will help us to access the location of link in which we provide a state of user as a object
     
    const[user,setUser]=useState({});
    const [requestInprogress,setRequestInprogess]=useState(false);
    const {userId}=useParams();
    const auth=useAuth();
    console.log('auth',auth);
    const navigate=useNavigate();

    

    useEffect(()=>{
      const getUser=async ()=>{
        const response=await UserInfo(userId);
        console.log('response user',response)
        if(response.success){
           setUser(response.data.user);
        }else{
            toast.error(response.message);
            return navigate('/');

          
        }

      }
      getUser();
    
    
    },[userId,navigate]);

    
    const checkUserIsAfriend=()=>{
      const friends=auth.user.friends;
      //adding user friends array
      console.log(friends)
      const friendIds=friends?.map((friend) => friend?.to_user && friend?.to_user?._id);// mapping over that array and collecting ids of freind array
      const index=friendIds?.indexOf(userId);//comparing loging userid and friends id

      if(index!== -1){
           return true;
      }
       
     
    
      return false;
  
  }

    const handleAddFreind=async ()=>{
        setRequestInprogess(true);
        const response=await addFreind(userId);
        if(response.success){
            const {friendship}= response.data;
           

            auth.updateUserFriends(true,friendship);
            toast.success('Added New Friend Successfully');
        }
        else{
            toast.error(response.message);
        }

        setRequestInprogess(false);


     }
 
     const handleRemoveFreind=async ()=>{

        setRequestInprogess(true);
        const response=await RemoveFreind(userId);
        if(response.success){
            const freindship= await auth.user.friends?.filter((friend)=>friend?.to_user?._id===userId);

            auth.updateUserFriends(false,freindship[0]);
            toast.success('Remove  Friend Successfully');
        }
        else{
            toast.error(response.message);
        }

        setRequestInprogess(false);
     }



    return(
        <div className={styles.UserProfileform} >
             <span className={styles.SignupHeader}>User Profile</span>
             <div className={styles.imagediv}>
             <img className={styles.images} src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt='avatarlogo'/>
             </div>
             
            <div className={styles.SignUpFeild}>
                <div>Email:{user?.email}</div>
            </div>
            <div className={styles.SignUpFeild}>
             <div>Name:{user?.name}</div>
            </div>
           
            <div className={styles.SignUpFeild}>
               {checkUserIsAfriend() ?
                (<button className={styles.SignUpBtn} 
                onClick={handleRemoveFreind}
                disabled={requestInprogress}
                >
                    {requestInprogress?'Removing friend...':' Remove Friend'}
                </button>)
                :(<button className={styles.SignUpBtn} 
                    onClick={handleAddFreind}
                    disabled={requestInprogress}
                >
                  {requestInprogress ?'Adding friend...':' Add Friend'}
                  </button>)}
            

            </div>

        </div>
    )
}


export default UserProfile;