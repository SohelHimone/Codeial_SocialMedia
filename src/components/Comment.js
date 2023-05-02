import styles from '../style/home.module.css';
import PropsTypes from 'prop-types';

const Comment=({comment})=>{
    return(
        <div className={styles.postCommentItem}>
                    <div className={styles.postCommentHeader}>
                        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                        <span className={styles.postCommentTime}>a minute ago</span>
                        <span className={styles.postCommentLikes}>22</span>
                    </div>
                    <div className={styles.postCommentContent}>{comment.content}</div>
        </div>
    );

};
       
Comment.propsTypes={
   comment:PropsTypes.object.isRequired
};

export default Comment;