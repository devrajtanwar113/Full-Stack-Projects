import {createSlice} from '@reduxjs/toolkit';

const platformSlice=createSlice({
  name:'platform',
  initialState:{
    selected:'Twitter',
    available:['Twitter','Facebook','Instagram'],},
  reducers:{
    platformSelected:(state,action)=>{
      state.selected=action.payload;
    },},});

export const {platformSelected}=platformSlice.actions;
export const selectPlatform=(state)=>state.platform.selected;
export const selectAvailablePlatforms=(state)=>state.platform.available;
export default platformSlice.reducer;