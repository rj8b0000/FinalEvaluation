import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: [],
  },
  reducers: {
    addAddressToList: (state, action) => {
      state.address.push(action.payload);
    },
  },
});
export const { addAddressToList } = addressSlice.actions;
export default addressSlice.reducer;
