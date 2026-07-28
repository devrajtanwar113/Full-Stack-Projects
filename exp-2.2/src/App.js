import "./App.css";
import {useState,useMemo,useCallback} from "react";
import {useAppDispatch,useAppSelector} from "./app/hooks";
import {postAdded} from "./features/posts/postsSlice";
import {platformSelected,selectPlatform,selectAvailablePlatforms} from "./features/platform/platformSlice";
import PostStats from "./components/PostStats";
import PostList from "./components/PostList";

function App(){
  const dispatch=useAppDispatch();
  const platform=useAppSelector(selectPlatform);
  const availablePlatforms=useAppSelector(selectAvailablePlatforms);
  const [postContent,setPostContent]=useState("");
  const [error,setError]=useState("");
  const [showRecent,setShowRecent]=useState(false);

  const maxChars={
    Twitter:280,
    Facebook:63206,
    Instagram:2200
  };

  const currentLimit=useMemo(()=>maxChars[platform],[platform]);

  const handlePostChange=useCallback((e)=>{
    const text=e.target.value;
    const limit=currentLimit;
    if(text.length<=limit){
      setPostContent(text);
      setError("");
    }else{
      setError(`❌ Maximum ${limit} characters allowed for ${platform}!`);
    }
  },[currentLimit,platform]);

  const handlePlatformChange=useCallback((e)=>{
    const newPlatform=e.target.value;
    dispatch(platformSelected(newPlatform));
    setError("");
    if(postContent.length>maxChars[newPlatform]){
      setError(`⚠️ Your post has ${postContent.length} characters. ${newPlatform} allows only ${maxChars[newPlatform]}!`);
    }
  },[dispatch,postContent]);

  const handlePublish=useCallback(()=>{
    if(postContent.trim().length===0){
      setError("❌ Please write something before publishing!");
      return;
    }
    if(postContent.length>maxChars[platform]){
      setError(`❌ Too many characters for ${platform}! Maximum is ${maxChars[platform]}.`);
      return;
    }
    dispatch(postAdded(postContent,platform));
    alert(`✅ Post published on ${platform}!\n\n📝 ${postContent}`);
    setPostContent("");
    setError("");
  },[dispatch,postContent,platform]);

  return(
    <div className="container">
      <h1>📱 Optimized Social Media Post Composer</h1>
      <h4 style={{color:'#666',textAlign:'center'}}>⚡ With Memoized Selectors & Performance Optimizations</h4>
      
      <label>Select Platform</label>
      <br/><br/>
      <select value={platform} onChange={handlePlatformChange}>
        {availablePlatforms.map((p)=>(
          <option key={p}>{p}</option>
        ))}
      </select>
      
      <br/><br/>
      
      <label>Write Your Post</label>
      <br/><br/>
      <textarea
        rows="8"
        cols="60"
        placeholder={`Write your post here... (Max ${currentLimit} chars)`}
        value={postContent}
        onChange={handlePostChange}
      ></textarea>
      
      <br/>
      <div style={{fontSize:"14px",color:postContent.length>currentLimit?"red":"green",fontWeight:"bold"}}>
        📊 {postContent.length}/{currentLimit} characters
      </div>
      
      {error&&(
        <div style={{color:"red",marginTop:"10px",padding:"10px",backgroundColor:"#ffe6e6",borderRadius:"5px",fontWeight:"bold"}}>
          {error}
        </div>
      )}
      
      <br/>
      <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
        <button onClick={handlePublish}>🚀 Publish</button>
        <button 
          onClick={()=>setShowRecent(!showRecent)}
          style={{
            background:showRecent?'#ff9800':'#607d8b'
          }}
        >
          {showRecent?'📋 Show All':'🕐 Show Recent'}
        </button>
      </div>
      
      <PostStats />
      <PostList showRecent={showRecent} />
      
      <div style={{
        fontSize:'12px',
        color:'#999',
        marginTop:'20px',
        padding:'10px',
        background:'#f9f9f9',
        borderRadius:'5px',
        border:'1px solid #eee'
      }}>
        ⚡ Performance: Selectors are memoized with createSelector!
        <br/>📊 Check console for re-render logs.
        <br/>🔄 Components only re-render when their data changes.
      </div>
    </div>
  );
}

export default App;