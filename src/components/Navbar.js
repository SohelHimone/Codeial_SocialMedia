import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { Searchuser } from "../api";

const Navbar=()=>{
    const [results,setResults]=useState([]);
    const [searchtext,setSearchtext]=useState('');

    useEffect(()=>{
       const fectchUsers= async ()=>{
        const response= await Searchuser(searchtext);
        if(response.success){
            setResults(response.data.users);
        }
    }
        if(searchtext.length > 2){
            fectchUsers();
        }
        else{
           setResults([])
        }
       
    },[searchtext])

    const auth=useAuth();
    return(
        <div style={styles.Navbar}>
            <Link to='/'>
               <h1>Codeial</h1>
            </Link>
            {auth.user && (
                <div style={styles.avatar}>
                <Link to='/setting'>
                  <img style={styles.images} src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt='avatarlogo'/>
                 </Link>
                 <span>{auth.user?.name}</span>
             </div>
            )}
            
            <div style={styles.searchcontainer}>
                <input style={styles.searchinput} placeholder="Search here..."
                value={searchtext}
                onChange={(e)=>setSearchtext(e.target.value)}></input>
                <div style={styles.searchimg}>
                   <img style={styles.images}  src="https://as1.ftcdn.net/v2/jpg/00/83/10/90/1000_F_83109078_BOS0Wxe3v1slxIprmr3VK6HDBBrnsArt.jpg" alt=""></img>
                </div>
                {searchtext.length>0 && <div style={styles.searchresultdiv}>
                    <ul>
                        {results.map((user)=>(
                            <li style={styles.searchResultsRow} key={`user-${user._id}`}>
                              <Link to={`/user/${user._id}`}>
                                <img  style={styles.useimage}  src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt="userimg"></img>
                                <span style={styles.username}>{user.name}</span>
                              </Link>
                            </li>
                        )

                        )}
                    </ul>
                </div>}
                

            </div>
          
            {auth.user?(
                
                <div style={styles.SignUpDiv}>
                    <li onClick={auth.logout}>
                    logout
                    </li>
                    
                </div>
            ):(
                <>
                <div style={styles.LoginDiv}>
                <Link to="/login">LogIN</Link>
                </div>

                <div style={styles.ResgiterDiv}>
                <Link to='/register'>ResgiterIn</Link>
               </div>
             </>
           
            )}
             

            
        </div>
    )
}


const styles={
    Navbar:{
        width:'100%',
        height:'10%',
        display:'flex',
        backgroundColor:'blue'
    },
    username:{
       fontSize:"15px",
       marginLeft:'5px'
    },
    searchresultdiv:{
        background: "#fff",
        flexGrow: 1,
        borderRadius: "0 0 3px 3px",
        position: "absolute",
        width: "100%",
        top: "40px",
        border: "1px solid #e0e0e0",
        zIndex: 100,
        maxHeight: "452px",
        overflow: "scroll",
    },
    searchResultsRow: {
        display: "flex",
        alignItems: "center",
        padding: "9px 14px"
    },
    useimage:{
         width:30,
         height:30
    },
    searchcontainer:{
       width:'25%',
       height:"25px",
       display:'flex',
       position:'absolute',
       left:"35%",
       top:'4%',
       borderRadius:'10px'
    },
    searchimg:{
        width:25,
        height:25
    },
    searchinput:{
        width:'90%',
        height:"100%",
        borderRadius:'10px',
        padding:'0px 5px',
        fontSize:'16px'
    },
    LoginDiv:{
        width:25,
        height:25,
        position:'absolute',
        top:'5%',
        right:'15%',
        fontWeight:700,
        fontSize: 20
    },
    avatar:{
            width:50,
            height:50,
            position:'absolute',
            top:'3%',
            right:'18%',
           
        
    },
    images:{
        width:'120%',
        height:'120%'
    },
    SignUpDiv:{
        width:30,
        height:30,
        position:'absolute',
        top:'5%',
        right:'10%',
        fontWeight:700,
        fontSize: 20
    },
    ResgiterDiv:{
        width:30,
        height:30,
        position:'absolute',
        top:'5%',
        right:'5%',
        fontWeight:700,
        fontSize: 20
    }
}


export default Navbar;