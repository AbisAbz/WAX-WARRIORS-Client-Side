import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.image = action.payload.image;
    },

    logOutDetails: (state, action) => initialState,
  },
});

export const { setUserDetails, logOutDetails } = userSlice.actions;
export default userSlice.reducer;
