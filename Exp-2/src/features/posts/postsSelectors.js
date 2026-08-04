import {createSelector} from '@reduxjs/toolkit';
import {selectAllPosts} from './postsSlice';

export const selectPostCount=(state)=>state.posts.ids.length;

export const selectPostsByPlatform=createSelector(
  [selectAllPosts],
  (posts)=>{
    const counts={};
    posts.forEach(post=>{
      counts[post.platform]=(counts[post.platform]||0)+1;
    });
    return counts;
  }
);

export const selectRecentPosts=createSelector(
  [selectAllPosts],
  (posts)=>{
    const sorted=[...posts].sort((a,b)=>b.date.localeCompare(a.date));
    return sorted.slice(0,5);
  }
);

export const selectPostStats=createSelector(
  [selectAllPosts],
  (posts)=>{
    const total=posts.length;
    const platformCounts={};
    posts.forEach(post=>{
      platformCounts[post.platform]=(platformCounts[post.platform]||0)+1;
    });
    return{
      total,
      platformCounts,
      hasPosts:total>0,
      averageLength:posts.reduce((sum,p)=>sum+p.content.length,0)/(total||1)
    };
  }
);

export const selectPostsForPlatform=(platform)=>createSelector(
  [selectAllPosts],
  (posts)=>posts.filter(post=>post.platform===platform)
);