import "./App.css";
import {useState} from "react";
import {useAppDispatch,useAppSelector} from "./app/hooks";
import {postAdded} from "./features/posts/postsSlice";
import {platformSelected,selectPlatform,selectAvailablePlatforms} from "./features/platform/platformSlice";

function App(){
  const dispatch=useAppDispatch();
  const platform=useAppSelector(selectPlatform);
  const availablePlatforms=useAppSelector(selectAvailablePlatforms);
  const [postContent,setPostContent]=useState("");
  const [error,setError]=useState("");

  const maxChars={
    Twitter:280,
    Facebook:63206,
    Instagram:2200
  };

  const handlePostChange=(e)=>{
    const text=e.target.value;
    const limit=maxChars[platform];
    if(text.length<=limit){
      setPostContent(text);
      setError("");
    }else{
      setError(`❌ Maximum ${limit} characters allowed for ${platform}!`);
    }
  };

  const handlePlatformChange=(e)=>{
    const newPlatform=e.target.value;
    dispatch(platformSelected(newPlatform));
    setError("");
    if(postContent.length>maxChars[newPlatform]){
      setError(`⚠️ Your post has ${postContent.length} characters. ${newPlatform} allows only ${maxChars[newPlatform]}!`);
    }
  };

  const handlePublish=()=>{
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
  };

  return(
    <div className="container">
      <h1>📱 Social Media Post Composer</h1>
      
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
        placeholder={`Write your post here... (Max ${maxChars[platform]} chars)`}
        value={postContent}
        onChange={handlePostChange}
      ></textarea>
      
      <br/>
      <div style={{fontSize:"14px",color:postContent.length>maxChars[platform]?"red":"green",fontWeight:"bold"}}>
        📊 {postContent.length}/{maxChars[platform]} characters
      </div>
      
      {error&&(
        <div style={{color:"red",marginTop:"10px",padding:"10px",backgroundColor:"#ffe6e6",borderRadius:"5px",fontWeight:"bold"}}>
          {error}
        </div>
      )}
      
      <br/><br/>
      <button onClick={handlePublish}>🚀 Publish</button>
    </div>
  );
}

export default App;