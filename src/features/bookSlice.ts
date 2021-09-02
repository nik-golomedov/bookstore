import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { initialValuesAddBookI } from "../app/AddBook";
import { AddCategoryI } from "../app/AddCategory";
import { addReviewI } from "../app/Book";
import { BooksI } from "../app/MainPage";
import { UserI } from "./userSlice";

export interface CategoryI {
  value: string;
  id: number;
}
export interface BookI {
  title: string;
  author: string;
  description: string;
  price: number;
  snippet?: string;
  creator: number | null;
  rating: number;
  image: string;
  id: number;
  category: CategoryI;
}

interface ReviewI {
  text?: string;
  id?: number;
  user?: UserI;
  createdAt: string;
}

export interface InitialStateGetBooksI {
  fav: any;
  books: Array<BooksI>;
  review: Array<ReviewI>;
  filteredBooks: Array<BooksI>;
  category: Array<CategoryI>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}

export const addBook = createAsyncThunk(
  "book/addBook",
  async (formValues: initialValuesAddBookI, thunkAPI) => {
    try {
      let formData = new FormData();

      formData.append("title", formValues.title);
      formData.append("author", formValues.author);
      formData.append("description", formValues.description);
      formData.append("price", String(formValues.price));
      formData.append("creator", String(formValues.creator));
      formData.append("category", formValues.category);
      if (formValues.snippet) {
        formData.append("snippet", formValues.snippet);
      }
      if (formValues.file) {
        formData.append("header", formValues.file.name);
        formData.append("image", formValues.file);
      }
      const response = await axios.post("/books/addbook", formData);
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

export const addReview = createAsyncThunk(
  "book/addReview",
  async (value: addReviewI, thunkAPI) => {
    try {
      const response = await axios.post("/books/addreview", value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getReview = createAsyncThunk(
  "book/getReview",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/books/getreview/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface AddFavI {
  userId: number | null;
  bookId: number | null;
}

export const addFavourites = createAsyncThunk(
  "book/addFavourites",
  async ({ userId, bookId }: AddFavI, thunkAPI) => {
    try {
      const response = await axios.post("/books/addfavourites", {
        userId,
        bookId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFavourites = createAsyncThunk(
  "book/getFavourites",
  async (id: number | null, thunkAPI) => {
    try {
      const response = await axios.get(`/books/getfavourites/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export interface RatingI {
  value: string;
  userId: string;
  bookId: string;
}

export const addRating = createAsyncThunk(
  "book/addRating",
  async ({ value, userId, bookId }: RatingI, thunkAPI) => {
    try {
      const response = await axios.post("/books/addrating", {
        value,
        userId,
        bookId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "book/addCategory",
  async (value: AddCategoryI, thunkAPI) => {
    try {
      const response = await axios.post("/books/addcategory", value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk("book/getCategory", async () => {
  try {
    const response = await axios.get("/books/getcategory");
    return response.data;
  } catch (error) {
     console.log(error);
  }
});

export const editBook = createAsyncThunk(
  "book/editBook",
  async (values: {
    description: string;
    price: number;
    userId: number | null;
    snippet: string;
    bookId:string
  },thunkAPI) => {
    try {
      const response = await axios.patch("/books/editbook", values)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState: InitialStateGetBooksI = {
  fav: [],
  books: [],
  review: [],
  filteredBooks: [],
  category: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addCurrentReview(state, action) {
      state.review && state.review.push(action.payload);
    },
  },
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
        state.filteredBooks = action.payload;
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
    builder.addCase(getReview.pending, (state, action) => {
      state.isFetching = true;
    }),
      builder.addCase(getReview.fulfilled, (state, action) => {
        state.review = action.payload;
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
      }),
      builder.addCase(getReview.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder.addCase(getFavourites.pending, (state, action) => {
      state.isFetching = true;
    }),
      builder.addCase(getFavourites.fulfilled, (state, action) => {
        state.fav = action.payload;
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
      }),
      builder.addCase(getFavourites.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder.addCase(getCategory.pending, (state, action) => {
      state.isFetching = true;
    }),
      builder.addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
      }),
      builder.addCase(getCategory.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;

export const { addCurrentReview } = booksSlice.actions;
