import styles from '../style/home.module.css';
import Comment from '../components/Comment';
import Loader from '../components/Loader';

import { Link } from 'react-router-dom';
import { useAuth, usePost } from '../hooks';
import FriendsList from '../components/FriendsList'
import CreatePost from '../components/CreatePost';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {AddComment} from '../api';


const Home=()=>{
    //created custom hooks by useContext so that their props we can pass to every child
    const posts=usePost();
    const auth=useAuth();
    const [comment,setComment]=useState('');
    const [commentAdd,setCommentAdd]=useState(false);
    console.log('comments on gg',posts)

    const handleAddcomment=async (postId)=>{
        setCommentAdd(true)
        if (comment === '') {
            return;
          }
        
          const response = await AddComment(comment, postId);
            console.log('comment response',response);
            if(response.success){
                setComment('');
                posts.addComment(response.data.comment,postId)
                toast.success('Comment Created Succesfully');
            }else{
                toast.error(response.message);
             }
             setCommentAdd(false)
      
    }
  



  
   if(posts.loading){
       return(
           <Loader/>
       )
   }

    return(
       
        <div className={styles.home}>
        <div className={styles.postsList}>
          <CreatePost/>
           {posts.data.map((post)=>
            (<div className={styles.postWrapper} key={`post-${post._id}`}>
                <div className={styles.postHeader} >
                    <div className={styles.postAvatar}>
                       <img src="https://cdn-icons-png.flaticon.com/128/236/236832.png" alt="user_img"></img>
                   
                    <div className="post-heading-content">
                        <Link to={
                            {
                                pathname:`/user/${post.user._id}`,
                                state:{
                                    user: post.user
                                },
                            }
                        } className={styles.postAuthor}>{post.user.name}</Link>
                        <span className={styles.postTime}>  a minute ago</span>

                    </div>
                </div>

              
                <div className={styles.postContent}>
                 {post.content}
                </div>
                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <img src="https://cdn-icons-png.flaticon.com/128/10264/10264760.png" alt="likeImg"></img>
                        <span>{post.likes.length}</span>

                    </div>
                    <div className={styles.postCommentBox}>
                        <img src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png" alt="commentimg"></img>
                        <span>{post.comments.length}</span>

                    </div>
                 </div>
                 <div className={styles.postCommentBox}>
                   <input placeholder="Comment Here...."
                   value={comment}
                   onChange={(e)=>setComment(e.target.value)}
                   onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddcomment(post._id);
                    }
                  }} />
                 </div>
                <div className={styles.postCommentsList}>
                      {post.comments.map((comment)=>(
                      <Comment comment={comment} key={`post-comment-${comment._id}`}/>
                ))}

                    
                </div>
               
            </div>

        </div>)
           )}

            
        </div>
        {auth.user && <FriendsList />}
        </div>
       
    )

}

export default Home;