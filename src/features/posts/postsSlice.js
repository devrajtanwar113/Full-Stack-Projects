import {createSlice,createEntityAdapter,nanoid} from '@reduxjs/toolkit';

const postsAdapter=createEntityAdapter({
  sortComparer:(a,b)=>b.date.localeCompare(a.date),
});

const initialState=postsAdapter.getInitialState({
  status:'idle',
  error:null,
});

const postsSlice=createSlice({
  name:'posts',
  initialState,
  reducers:{
    postAdded:{
      reducer:postsAdapter.addOne,
      prepare:(content,platform)=>{
        return{
          payload:{
            id:nanoid(),
            content,
            platform,
            date:new Date().toISOString(),
          },
        };
      },
    },
    postsReceived:postsAdapter.setAll,
    postUpdated:postsAdapter.updateOne,
    postDeleted:postsAdapter.removeOne,
    postsCleared:postsAdapter.removeAll,
  },
});

export const{
  postAdded,
  postsReceived,
  postUpdated,
  postDeleted,
  postsCleared,
}=postsSlice.actions;

export const{
  selectAll:selectAllPosts,
  selectById:selectPostById,
  selectIds:selectPostIds,
}=postsAdapter.getSelectors((state)=>state.posts);

export default postsSlice.reducer;