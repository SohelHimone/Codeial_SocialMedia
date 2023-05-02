import { useState } from "react";
import styles from '../style/home.module.css';
import { addPost } from "../api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {usePost} from '../hooks';

const CreatePost =()=>{

    const [post,setPost]=useState('');
    const [addpost,setAddpost]=useState(false);
    const posts = usePost();

    const handleCreatePost= async()=>{
        setAddpost(true)
        
        const response=await addPost(post);
        if(response.success){
            setPost('')
            posts.UpdatePost(response.data.post);
            toast.success('Post Added Successfully');
         }else{
             toast.error(response.message);
         }
        setAddpost(false)

    }

   return(
       <div className={styles.createPost}>
           <textarea style={styles.addpost}
           placeholder="Post Here...."
           value={post}
           onChange={(e)=>setPost(e.target.value)}
           />
       
       <div >
           <button className={styles.addPostBtn} onClick={handleCreatePost}>{addpost ?'Adding Post':'Add Post'}</button>
       </div>

      </div>
   )
}


export default CreatePost;