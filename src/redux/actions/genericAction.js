import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

const GENRE = "authentication:GENRE";
const PLACEMENT = "authentication:PLACEMENT";
const ALL_COLLECTION_DATA = "authentication:ALL_COLLECTION_DATA";
const RATE = "authentication:RATE";
const COMMUNITY = "authentication:COMMUNITY";
const GET_PAY_IT_BEFORE = "authentication:GET_PAY_IT_BEFORE";
const PROFILE = "authentication:PROFILE";

export const getGenresAction = createAsyncThunk(
  GENRE,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("generic/genres");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPlacementAction = createAsyncThunk(
  PLACEMENT,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("generic/placements");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCollectionDataAction = createAsyncThunk(
    ALL_COLLECTION_DATA,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("guest/dashboard");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRateAction = createAsyncThunk(
    RATE,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("pay/rate");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommunityAction = createAsyncThunk(
    COMMUNITY,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("community");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfileAction = createAsyncThunk(
    PROFILE,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("profile");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getHasPayItBeforeAction = createAsyncThunk(
  GET_PAY_IT_BEFORE,
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosClient().get("pay/users");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
