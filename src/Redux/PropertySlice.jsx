import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  image: "",
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setPropOwnerDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.image = action.payload.image;
    },
    propertyOwnerLogOutDetails: (state, action) => initialState, 
  },
});

export const { setPropOwnerDetails, propertyOwnerLogOutDetails } = propertySlice.actions;
export default propertySlice.reducer;

