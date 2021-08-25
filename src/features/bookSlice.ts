import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValuesI } from "../app/SignUp";

import axios from "../api/axios";
import { initialValuesAddBookI } from "../app/AddBook";

export interface BookI extends initialValuesAddBookI {
    id:number

}

export interface InitialStateGetBooksI {
  books: Array<BookI>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}

export const addBook = createAsyncThunk(
  "book/addBook",
  async (formValues: initialValuesAddBookI, thunkAPI) => {
    try {
      const response = await axios.post("/books/addbook", formValues);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBooks = createAsyncThunk("book/getBooks", async () => {
  try {
    const response = await axios.get("/books");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState: InitialStateGetBooksI = {
  books: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state, action) => {
      state.isFetching = true;
    }),
      builder.addCase(addBook.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
      }),
      builder.addCase(addBook.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder.addCase(getBooks.pending, (state, action) => {
      state.isFetching = true;
    }),
      builder.addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
      }),
      builder.addCase(getBooks.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;
