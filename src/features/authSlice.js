import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
// auth login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:8000/api/login", {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//auth register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:8000/api/register", {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  token: localStorage.getItem("token"),
  firstName: "",
  lastName: "",
  email: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register case
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending", userLoaded: true };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        let decoded = jwt_decode(action.payload);

        return {
          ...state,
          token: action.payload,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          registerStatus: "success",
          registerError: "",
          loginStatus: "",
          loginError: "",
          userLoaded: false,
        };
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload) {
        toast.error(`${action.payload.message}`, {
          position: "bottom-left",
        });
      }
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    // login case
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending", userLoaded: true };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        let decoded = jwt_decode(action.payload);
        return {
          ...state,
          token: action.payload,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          loginStatus: "success",
          registerStatus: "",
          registerError: "",
          userLoaded: false,
        };
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      if (action.payload) {
        toast.error(`${action.payload}`, {
          position: "bottom-left",
        });
      }
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});
export default authSlice.reducer;
