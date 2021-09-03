import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { initialValuesAddBookI } from "../app/AddBook";
import { AddCategoryI } from "../app/AddCategory";
import { addReviewI } from "../app/Book";
import { BooksI } from "../app/MainPage";
import { UserI } from "./userSlice";
import { SearchI } from "../app/MainPage";

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
interface DataI {
  books: Array<BooksI>;
  total: number;
}
export interface InitialStateGetBooksI {
  fav: any;
  data: DataI;
  singleBook: BookI;
  review: Array<ReviewI>;
  filter: SearchI;
  category: Array<CategoryI>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isSuccessBook:boolean
  isSuccessRating:boolean;
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

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async ({ newFilterSearch }: { newFilterSearch: SearchI }) => {
    try {
      const response = await axios.get("/books", {
        params: { ...newFilterSearch },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
  async (
    values: {
      description: string;
      price: number;
      userId: number | null;
      snippet: string;
      bookId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch("/books/editbook", values);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState: InitialStateGetBooksI = {
  fav: [],
  data: { books: [], total: 0 },
  review: [],
  singleBook: {
    id: 0,
    category: { value: "", id: 0 },
    title: "",
    author: "",
    description: "",
    price: 0,
    creator: 0,
    rating: 0,
    image: "",
  },
  filter: {
    author: "",
    price: [],
    rating: "",
    category: "",
    order: "",
    page: 0,
  },
  category: [],
  isFetching: false,
  isSuccess: false,
  isSuccessRating : false,
  isError: false,
  isSuccessBook:false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addCurrentReview(state, action) {
      state.review && state.review.push(action.payload);
    },
    addFilterParams(state, action: PayloadAction<SearchI>) {
      state.filter = { ...state.filter, ...action.payload };
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
        state.data = action.payload;
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
    builder.addCase(getBook.pending, (state, action) => {
      state.isFetching = true;
      state.isSuccessBook = false
    }),
      builder.addCase(getBook.fulfilled, (state, action) => {
        state.singleBook = action.payload;
        state.isFetching = false;
        state.isError = false;
        state.isSuccessBook = true;
      }),
      builder.addCase(getBook.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccessBook = false;
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
    builder.addCase(addRating.pending, (state, action) => {
      state.isFetching = true;
      state.isSuccessRating = false;
    }),
      builder.addCase(addRating.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.isSuccessRating = true;
      }),
      builder.addCase(addRating.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccessRating = false;
        state.isError = true;
        state.error = action.payload;
      }),
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

export const { addCurrentReview, addFilterParams } = booksSlice.actions;
