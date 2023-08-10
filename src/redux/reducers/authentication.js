import { createSlice } from "@reduxjs/toolkit";
import { signInAction, signUpAction } from "../actions/authenticationAction";
const initialState = {

  signingInStatus: "idle",
  signingInSuccess: "",
  signingInError: "",

  signingUpStatus: "idle",
  signingUpSuccess: "",
  signingUpError: "",

  userData: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearLoginStatus(state) {
      state.signingInStatus = "idle";
      state.signingInSuccess = "";
      state.signingInError = "";
    },

    clearSignUpStatus(state) {
      state.signingUpStatus = "idle";
      state.signingUpSuccess = "";
      state.signingUpError = "";
    },

    clearUserData(state) {
      state.userData = null;
    },

    setUserData(state, action) {
      // console.log(action.payload)
      state.userData = action.payload;
    },
  },

  extraReducers: (builder) => {

    builder
      .addCase(signInAction.pending, (state) => {
        state.signingInStatus = "loading";
      })
      .addCase(signInAction.fulfilled, (state, { payload }) => {
        state.signingInStatus = "completed";
        // update redux state
        state.userData = payload?.payload;
        console.log(payload, "gggggggg");
      })
      .addCase(signInAction.rejected, (state, { payload }) => {
        state.signingInStatus = "failed";
        console.log(payload, "failllllllllll");
        state.signingInError = payload?.message;
      });


    builder
      .addCase(signUpAction.pending, (state) => {
        state.signingUpStatus = "loading";
      })
      .addCase(signUpAction.fulfilled, (state, { payload }) => {
        state.signingUpStatus = "completed";
        // update redux state
        state.userData = payload?.payload;
        console.log(payload, "gggggggg");
      })
      .addCase(signUpAction.rejected, (state, { payload }) => {
        state.signingUpStatus = "failed";
        console.log(payload, "failllllllllll");
        state.signingUpError = payload?.message;
      });

  },
});

export const {
  clearLoginStatus,
  clearSignUpStatus,
  clearUserData,
  setUserData
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
