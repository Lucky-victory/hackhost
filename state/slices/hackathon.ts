import { createSlice } from '@reduxjs/toolkit';
import { StateStatus } from '../types';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    data: [],
    status: 'loading' as StateStatus,
    error: null,
};
export const hackathonSlice = createSlice({
    name: 'hackathon',
    initialState,
    reducers: {
        fetc() {},
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.comments,
            };
        },
    },
});

export const { fetc } = hackathonSlice.actions;
export default hackathonSlice.reducer;
