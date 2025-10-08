import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("User"));

const initialState = {
    user: storedUser
}

const userDataSlice = createSlice({
    name: "user",
    initialState,
    reducers:{

    }
});

 export default userDataSlice.reducer;