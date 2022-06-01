import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    user: null,
    allUsers: [],
    reducers: {
        setUser:(state, {payload}) => {
            state.user = payload;
        },
        removeUser:(state) => {
            state.user = null
        }
    }
})

export const {setUser,removeUser} = userSlice.actions

export default userSlice.reducer