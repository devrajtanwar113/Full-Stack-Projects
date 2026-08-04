import React from 'react';
import {useAppSelector} from '../app/hooks';
import {selectPostStats,selectPostCount} from '../features/posts/postsSelectors';
import {selectPlatform} from '../features/platform/platformSlice';

const PostStats=React.memo(()=>{
  const stats=useAppSelector(selectPostStats);
  const totalPosts=useAppSelector(selectPostCount);
  const currentPlatform=useAppSelector(selectPlatform);

  console.log('📊 PostStats rendered!');

  return(
    <div style={{
      background:'#f0f0f0',
      padding:'15px',
      borderRadius:'8px',
      marginTop:'20px',
      border:'1px solid #ddd'
    }}>
      <h3 style={{margin:'0 0 10px 0'}}>📊 Post Statistics</h3>
      
      <div style={{display:'flex',gap:'20px',flexWrap:'wrap'}}>
        <div><strong>Total Posts:</strong> {stats.total}</div>
        <div><strong>Current Platform:</strong> {currentPlatform}</div>
        <div><strong>Has Posts:</strong> {stats.hasPosts?'✅ Yes':'❌ No'}</div>
        <div><strong>Avg Length:</strong> {Math.round(stats.averageLength)} chars</div>
      </div>

      {stats.total>0&&(
        <div style={{marginTop:'10px'}}>
          <strong>Platform Distribution:</strong>
          <div style={{display:'flex',gap:'15px',marginTop:'5px'}}>
            {Object.entries(stats.platformCounts).map(([platform,count])=>(
              <span key={platform} style={{
                background:platform===currentPlatform?'#4CAF50':'#e0e0e0',
                color:platform===currentPlatform?'white':'black',
                padding:'3px 10px',
                borderRadius:'12px',
                fontSize:'14px'
              }}>
                {platform}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

PostStats.displayName='PostStats';
export default PostStats;