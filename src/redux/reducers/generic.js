import { createSlice } from "@reduxjs/toolkit";
import { getAllCollectionDataAction, getCommunityAction, getGenresAction, getHasPayItBeforeAction, getPlacementAction, getProfileAction, getRateAction } from "../actions/genericAction";
const initialState = {

  genreStatus: "idle",
  genreSuccess: "",
  genreError: "",

  placementStatus: "idle",
  placementSuccess: "",
  placementError: "",

  allCollectionDataStatus: "idle",
  allCollectionDataSuccess: "",
  allCollectionDataError: "",

  rateStatus: "idle",
  rateSuccess: "",
  rateError: "",

  communityStatus: "idle",
  communitySuccess: "",
  communityError: "",

  genres: [],
  placements: [],
  allCollectionData: {},
  rate: {},
  community: {},
  hasPaidBefore: false,
  profileData: null,
};

const genericSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearGenreStatus(state) {
      state.genreStatus = "idle";
      state.genreSuccess = "";
      state.genreError = "";
    },
    clearPlacementStatus(state) {
      state.placementStatus = "idle";
      state.placementSuccess = "";
      state.placementError = "";
    },
    clearPayItRecordStatus(state) {
      state.hasPaidBefore = false;
    },
    clearAllCollectionDataStatus(state) {
      state.allCollectionDataStatus = "idle";
      state.allCollectionDataSuccess = "";
      state.allCollectionDataError = "";
    },
  },

  extraReducers: (builder) => {

    builder
      .addCase(getGenresAction.pending, (state) => {
        state.genreStatus = "loading";
      })
      .addCase(getGenresAction.fulfilled, (state, { payload }) => {
        state.genreStatus = "completed";
        // update redux state
        state.genres = payload?.payload;
        // console.log(payload, "gggggggg");
      })
      .addCase(getGenresAction.rejected, (state, { payload }) => {
        state.genreStatus = "failed";
        // console.log(payload, "failllllllllll");
        state.genreError = payload?.message;
    });

    builder
      .addCase(getPlacementAction.pending, (state) => {
        state.placementStatus = "loading";
      })
      .addCase(getPlacementAction.fulfilled, (state, { payload }) => {
        state.placementStatus = "completed";
        // update redux state
        state.placements = payload?.payload;
        // console.log(payload, "gggggggg");
      })
      .addCase(getPlacementAction.rejected, (state, { payload }) => {
        state.placementStatus = "failed";
        // console.log(payload, "failllllllllll");
        state.placementError = payload?.message;
    });

    builder
      .addCase(getAllCollectionDataAction.pending, (state) => {
        state.allCollectionDataStatus = "loading";
      })
      .addCase(getAllCollectionDataAction.fulfilled, (state, { payload }) => {
        state.allCollectionDataStatus = "completed";
        // update redux state
        state.allCollectionData = payload?.payload;
        // console.log(payload, "gggggggg");
      })
      .addCase(getAllCollectionDataAction.rejected, (state, { payload }) => {
        state.allCollectionDataStatus = "failed";
        // console.log(payload, "failllllllllll");
        state.allCollectionDataError = payload?.message;
    });

    builder
      .addCase(getRateAction.pending, (state) => {
        state.rateStatus = "loading";
      })
      .addCase(getRateAction.fulfilled, (state, { payload }) => {
        state.rateStatus = "completed";
        // update redux state
        state.rate = payload?.payload;
        // console.log(payload, "gggggggg");
      })
      .addCase(getRateAction.rejected, (state, { payload }) => {
        state.rateStatus = "failed";
        // console.log(payload, "failllllllllll");
        state.rateError = payload?.message;
    });

    builder
      .addCase(getCommunityAction.pending, (state) => {
        state.communityStatus = "loading";
      })
      .addCase(getCommunityAction.fulfilled, (state, { payload }) => {
        state.communityStatus = "completed";
        // update redux state
        state.community = payload?.payload;
        // console.log(payload, "gggggggg");
      })
      .addCase(getCommunityAction.rejected, (state, { payload }) => {
        state.communityStatus = "failed";
        // console.log(payload, "failllllllllll");
        state.communityError = payload?.message;
    });

    builder
      .addCase(getProfileAction.pending, (state) => {
        
      })
      .addCase(getProfileAction.fulfilled, (state, { payload }) => {
        // console.log('profileData', "profileData", profileData);
        state.profileData = payload?.payload;
        // console.log(payload, "gggggggg");
      })
      .addCase(getProfileAction.rejected, (state, { payload }) => {
        // state.communityStatus = "failed";
        // console.log(payload, "failllllllllll");
        // state.communityError = payload?.message;
    });

    builder
      .addCase(getHasPayItBeforeAction.pending, (state) => {
        // state.communityStatus = "loading";
      })
      .addCase(getHasPayItBeforeAction.fulfilled, (state, { payload }) => {
        // state.communityStatus = "completed";
        // update redux state
        state.hasPaidBefore = payload?.payload?.hasPaidBefore || false;
        // console.log(payload, "gggggggg");
      })
      .addCase(getHasPayItBeforeAction.rejected, (state, { payload }) => {
        // state.communityStatus = "failed";
        // console.log(payload, "failllllllllll");
        // state.communityError = payload?.message;
    });

  },
});

export const {
    clearGenreStatus,
    clearPlacementStatus,
    clearAllCollectionDataStatus,
    clearPayItRecordStatus
} = genericSlice.actions;

export default genericSlice.reducer;
