import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";
import { setData, setToken } from "../storage";

const SIGN_UP_USER = "authentication:SIGN_UP_USER";
const SIGN_IN_USER = "authentication:SIGN_IN_USER";

export const signUpAction = createAsyncThunk(
  SIGN_UP_USER,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().post("user/sign-up", args);
      // console.log(response.data.payload.token, "ffffff");
      setToken(response.data.payload.token);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signInAction = createAsyncThunk(
  SIGN_IN_USER,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().post("user/sign-in", args);
      // console.log(response.data.payload.token, "ffffff");
      setToken(response.data.payload.token);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
