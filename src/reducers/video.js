import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getVideo = createAsyncThunk("video/getVideo", async(videoId)=>{
    const {data:video} = await client(`${process.env.REACT_APP_BE}/videos/${videoId}`);
    return video;
})

const videoSlice = createSlice({
    name: 'slice',
    initialState: {
        isFetching: true,
        data: {}
    },
    reducers: {
        like(state,action){
            state.data={
                ...state.data,
                isLiked: !state.data.isLiked,
                likesCount: state.data.likesCount + 1,
            }
        },
        dislike(state,action){
            state.data={
                ...state.data,
                isDisliked: !state.data.isDisliked,
                dislikesCount: state.data.dislikesCount + 1,
            }
        },
        cancelLike(state){
            state.data = {
                ...state.data,
                isLiked: !state.data.isLiked,
                likesCount: state.data.likesCount - 1,
            }
        },
        cancelDislike(state){
            state.data = {
                ...state.data,
                isDisliked: !state.data.isDisliked,
                dislikesCount: state.data.dislikesCount - 1,
            }
        }
    },
    extraReducers: {
        [getVideo.fulfilled]: (state,action)=>{
            state.isFetching = false;
            state.data = action.payload;
        }
    }
})

export const {
    like,
    dislike,
    cancelLike,
    cancelDislike
  } = videoSlice.actions;

export default videoSlice.reducer;