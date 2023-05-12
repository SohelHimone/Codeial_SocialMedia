import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { Searchuser } from "../api";
import styles from '../style/navbar.module.css';

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
        <div className={styles.nav}>
            <Link to='/'>
               <h1 className={styles.title}>Codeial</h1>
            </Link>
            {auth.user && (
                <div className={styles.rightNav}>
                <Link to='/setting'>
                    <div className={styles.user}>
                       <img className={styles.userDp} src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt='avatarlogo'/>
                    </div>
                  
                 </Link>
                 <span>{auth.user?.name}</span>
             </div>
            )}
            
            <div className={styles.searchContainer}>
                <input  placeholder="Search here..."
                value={searchtext}
                onChange={(e)=>setSearchtext(e.target.value)}></input>
        
                {searchtext.length>0 && <div className={styles.searchResults}>
                    <ul>
                        {results.map((user)=>(
                            <li className={styles.searchResultsRow}  key={`user-${user._id}`}>
                              <Link to={`/user/${user._id}`}>
                                <img  className={styles.useimage}  src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt="userimg"></img>
                                <span className={styles.username}>{user.name}</span>
                              </Link>
                            </li>
                        )

                        )}
                    </ul>
                </div>}
                

            </div>
          
            {auth.user?(
                
                <div className={styles.navLinks}>
                    <li onClick={auth.logout}>
                       LOGOUT
                    </li>
                    
                </div>
            ):(
               
                <div className={styles.rightlist}>
                    <ul>
                    <li>
                        <Link to="/login">Log IN</Link>
                    </li>

                    <li>
                        <Link to='/register'>Resgiter In</Link>
                    </li>
                    </ul>
                </div>
               

           
            )}
             

            
        </div>
    )
}



 

export default Navbar;