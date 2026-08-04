import React from 'react';
import {useAppSelector} from '../app/hooks';
import {selectAllPosts} from '../features/posts/postsSlice';
import {selectRecentPosts} from '../features/posts/postsSelectors';

const PostList=React.memo(({showRecent=false})=>{
  const posts=useAppSelector(showRecent?selectRecentPosts:selectAllPosts);

  console.log(`📝 PostList rendered! (showRecent: ${showRecent})`);

  if(posts.length===0){
    return(
      <div style={{
        padding:'20px',
        textAlign:'center',
        color:'#666',
        border:'2px dashed #ddd',
        borderRadius:'8px',
        marginTop:'20px'
      }}>
        📭 No posts yet. Write your first post!
      </div>
    );
  }

  return(
    <div style={{marginTop:'20px'}}>
      <h3 style={{margin:'0 0 10px 0'}}>
        {showRecent?'🕐 Recent Posts (Last 5)':'📜 All Posts'}
      </h3>
      
      <div style={{
        maxHeight:'300px',
        overflowY:'auto',
        border:'1px solid #ddd',
        borderRadius:'8px',
        padding:'10px'
      }}>
        {posts.map((post)=>(
          <div key={post.id} style={{
            padding:'10px',
            borderBottom:'1px solid #eee',
            marginBottom:'5px'
          }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span style={{fontWeight:'bold'}}>📝 {post.content}</span>
              <span style={{
                background:'#e0e0e0',
                padding:'2px 8px',
                borderRadius:'10px',
                fontSize:'12px'
              }}>
                {post.platform}
              </span>
            </div>
            <div style={{fontSize:'12px',color:'#666'}}>
              {new Date(post.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{fontSize:'12px',color:'#999',marginTop:'5px'}}>
        Total: {posts.length} posts
      </div>
    </div>
  );
});

PostList.displayName='PostList';
export default PostList;