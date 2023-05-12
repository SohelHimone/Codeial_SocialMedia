
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import styles from '../style/friendslist.module.css';

const FriendsList=()=>{
    const auth=useAuth();
    const {friends=[]}= auth.user;
    console.log('friendship ',friends)
   return (
       <div className={styles.friendList}>
           <div className={styles.friendHeader}>Friends</div>
           
            {friends && friends.length===0 && (<div className={styles.noFriends}>
               No Friends Found
           </div>)}

           {friends && friends.map((friend)=>(<div key={`friend-${friend?._id}`}>
               <Link className={styles.friendItems} to={`/user/${friend?._id}`}>
                   <div className={styles.imagediv}>
                       <img className={styles.image} src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt="">
                       </img>
                   </div>
                   <div className={styles.friendsName}>{friend?.to_user?.email}</div>
               </Link>

           </div>

           ))}
       </div>
   )
}


 
export default FriendsList;