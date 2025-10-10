import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("User"));
const token = localStorage.getItem("accessToken")

const initialState = {
    user: storedUser,
    accessToken:token
}

const userDataSlice = createSlice({
    name: "user",
    initialState,
    reducers:{

    }
});

 export default userDataSlice.reducer;