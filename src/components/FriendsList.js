
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

const FriendsList=()=>{
    const auth=useAuth();
    const {friends=[]}= auth.user;
    console.log('friendship ',friends)
   return (
       <div style={styles.friendList}>
           <div style={styles.friendHeader}>Friends</div>
           
            {friends && friends.length===0 && (<div style={styles.noFriends}>
               No Friends Found
           </div>)}

           {friends && friends.map((friend)=>(<div key={`friend-${friend?._id}`}>
               <Link style={styles.friendItems} to={`/user/${friend?._id}`}>
                   <div style={styles.imagediv}>
                       <img style={styles.image} src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt="">
                       </img>
                   </div>
                   <div style={styles.friendsName}>{friend?.to_user?.email}</div>
               </Link>

           </div>

           ))}
       </div>
   )
}



const styles={
    friendList:{
        background: "#fff",
        marginLeft: 50,
        flexGrow: 0.2,
        height: "50vh",
        boxSizing: "border-box",
        marginTop: 20,
        border: "1px solid #e0e0e0",
        borderRadius: 4,
        overflowY: "scroll"
    },
    friendHeader:{
        display:'flex',
       justifyContent:'center',
       alignItems:'center',
        border:'1px solid black'
    },
    noFriends :{
        display: "flex",
        justifyContent:'center',
        margin: "20px 0"
      },
      friendItems:{
        display: "flex",
        padding: "5px 10px",
        color: "#616161",
        fontStyle:" normal",
        fontWeight:" 600",
        fontSize: 16,
        lineHeight: "22px",
        textDecoration:"none"
      },
      imagediv:{
          width:30,
          height:30,
          borderRadius:'50%',
      },

      image:{
          width:'100%',
          height:'100%'
      },
      friendsName :{
        padding: "0 10px"
      }
}
export default FriendsList;