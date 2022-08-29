import { createSlice,  createSelector,createEntityAdapter } from "@reduxjs/toolkit";
const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState({
    user: null,
    is_logged_in:false,
    token:null
  })

  
  export const loginSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
      logout: () => initialState,
      setUser: (state, action) => {
        state.user = action.payload.user,
        state.token = action.payload.token,
        state.is_logged_in = true
      },
    },
  });
  
  export default loginSlice.reducer;
  
  export const { logout, setUser } = loginSlice.actions;