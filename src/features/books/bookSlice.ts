import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import axios from "../../api/axios";
import { initialValuesAddBookI } from "./AddBook";
import { AddCategoryI } from "./AddCategory";
import { AddReviewI } from "./Book";
import { BooksI } from "./MainPage";
import { UserI } from "../auth/userSlice";
import { SearchI } from "./MainPage";
import { RootState } from "../store";

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
  creatorId: number | null;
  rating: number;
  image: string;
  id: number;
  category: CategoryI;
}

export interface ReviewI {
  text?: string;
  id?: number;
  user?: UserI | null;
  createdAt: string;
  bookId: number;
}

interface DataI {
  books: Array<BooksI>;
  total: number;
}

interface FavouritesI {
  books: BookI[];
}

export interface InitialStateGetBooksI {
  fav: FavouritesI;
  data: DataI;
  singleBook: BookI;
  review: Array<ReviewI>;
  filter: SearchI;
  category: Array<CategoryI>;
  notification: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isSuccessAddedBook: boolean;
  isErrorAddedBook: boolean;
  isSuccessFavourite: boolean;
  isSuccessDeleteFavourite: boolean;
  isSuccessEdit: boolean;
  isSuccessBook: boolean;
  isErrorBook: boolean;
  isSuccessRating: boolean;
  errorsAddedBook: unknown;
  error: unknown;
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
      formData.append("creatorId", String(formValues.creatorId));
      formData.append("category", formValues.category);
      if (formValues.snippet) {
        formData.append("snippet", formValues.snippet);
      }
      if (formValues.file) {
        formData.append("header", formValues.file.name);
        formData.append("image", formValues.file);
      }
      const response = await axios.post("/books", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      const response = await axios.get<BooksI>(`/books/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addReview = createAsyncThunk(
  "book/addReview",
  async (value: AddReviewI, thunkAPI) => {
    try {
      const response = await axios.post("/review", value);
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
      const response = await axios.get(`/review/${+id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface AddFavI {
  bookId: number | null;
}

export const addFavourites = createAsyncThunk(
  "book/addFavourites",
  async ({ bookId }: AddFavI, thunkAPI) => {
    try {
      const response = await axios.post("/favourites", {
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
  async () => {
    try {
      const response = await axios.get("/favourites");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFavourites = createAsyncThunk(
  "book/deleteFavourites",
  async ({ bookId }: AddFavI, thunkAPI) => {
    try {
      const response = await axios.delete(`/favourites/${bookId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface RatingI {
  value: number;
  userId: number | null;
  bookId: number;
}

export const addRating = createAsyncThunk(
  "book/addRating",
  async ({ value, bookId }: RatingI, thunkAPI) => {
    try {
      const response = await axios.post("/rating", {
        value,
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
      const response = await axios.post("/category", value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk("book/getCategory", async () => {
  try {
    const response = await axios.get("/category");
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
      bookId: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch("/books", values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState: InitialStateGetBooksI = {
  fav: { books: [] },
  data: { books: [], total: 0 },
  review: [],
  singleBook: {
    id: 0,
    category: { value: "", id: 0 },
    title: "",
    author: "",
    description: "",
    price: 0,
    creatorId: null,
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
  notification: false,
  isFetching: false,
  isSuccess: false,
  isSuccessRating: false,
  isSuccessFavourite: false,
  isSuccessAddedBook: false,
  isErrorAddedBook: false,
  isSuccessDeleteFavourite: false,
  isSuccessEdit: false,
  isError: false,
  isSuccessBook: false,
  isErrorBook: false,
  errorsAddedBook: null,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addCurrentReview(state, action: PayloadAction<ReviewI>) {
      state.review && state.review.push(action.payload);
    },
    addFilterParams(state, action: PayloadAction<SearchI>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    addNotification(state, action: PayloadAction<boolean>) {
      state.notification = action.payload;
    },
    clearAddBookRequest(state) {
      state.isSuccessAddedBook = false;
      state.isErrorAddedBook = false;
      state.errorsAddedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state, action) => {
      state.isSuccessAddedBook = false;
      state.isErrorAddedBook = false;
    }),
      builder.addCase(addBook.fulfilled, (state, action) => {
        state.isSuccessAddedBook = true;
        state.isErrorAddedBook = false;
      }),
      builder.addCase(addBook.rejected, (state, action) => {
        state.isSuccessAddedBook = false;
        state.isErrorAddedBook = true;
        state.errorsAddedBook = action.payload;
      });
    builder.addCase(getBooks.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
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
      state.isSuccessBook = false;
      state.isErrorBook = false;
    }),
      builder.addCase(getBook.fulfilled, (state, action) => {
        state.singleBook = action.payload;
        state.isSuccessBook = true;
        state.isErrorBook = false;
      }),
      builder.addCase(getBook.rejected, (state, action) => {
        state.isSuccessBook = false;
        state.isErrorBook = true;
      });
    builder.addCase(editBook.pending, (state, action) => {
      state.isSuccessEdit = false;
    }),
      builder.addCase(editBook.fulfilled, (state, action) => {
        state.isSuccessEdit = true;
      }),
      builder.addCase(editBook.rejected, (state, action) => {
        state.isSuccessEdit = false;
      });
    builder.addCase(addFavourites.pending, (state, action) => {
      state.isSuccessFavourite = false;
    }),
      builder.addCase(addFavourites.fulfilled, (state, action) => {
        state.isSuccessFavourite = true;
      }),
      builder.addCase(addFavourites.rejected, (state, action) => {
        state.isSuccessFavourite = false;
      });
    builder.addCase(deleteFavourites.pending, (state, action) => {
      state.isSuccessDeleteFavourite = false;
    }),
      builder.addCase(deleteFavourites.fulfilled, (state, action) => {
        state.isSuccessDeleteFavourite = true;
      }),
      builder.addCase(deleteFavourites.rejected, (state, action) => {
        state.isSuccessDeleteFavourite = false;
      });
    builder.addCase(getReview.pending, (state, action) => {}),
      builder.addCase(getReview.fulfilled, (state, action) => {
        state.review = action.payload;
      }),
      builder.addCase(getReview.rejected, (state, action) => {});
    builder.addCase(addRating.pending, (state, action) => {
      state.isSuccessRating = false;
    }),
      builder.addCase(addRating.fulfilled, (state, action) => {
        state.isSuccessRating = true;
      }),
      builder.addCase(addRating.rejected, (state, action) => {}),
      builder.addCase(getFavourites.pending, (state, action) => {}),
      builder.addCase(getFavourites.fulfilled, (state, action) => {
        state.fav = action.payload;
      }),
      builder.addCase(getFavourites.rejected, (state, action) => {});
    builder.addCase(getCategory.pending, (state, action) => {}),
      builder.addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      }),
      builder.addCase(getCategory.rejected, (state, action) => {});
  },
});

export default booksSlice.reducer;

export const {
  addCurrentReview,
  addFilterParams,
  clearAddBookRequest,
  addNotification,
} = booksSlice.actions;

const allBooks = (state: RootState) => state.books;

export const bookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.data.books
);

export const totalSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.data.total
);

export const filterSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.filter
);

export const categorySelector = createDraftSafeSelector(
  allBooks,
  (state) => state && state.category
);

export const isFetchingBooksSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isFetching
);

export const favListSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.fav.books
);

export const reviewSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.review
);

export const singleBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.singleBook
);

export const isSuccessEditSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessEdit
);

export const isSuccessRatingSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessRating
);

export const isErrorBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isErrorBook
);

export const isSuccessFavouriteSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessFavourite
);

export const isSuccessDeleteFavouriteSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessDeleteFavourite
);

export const isSuccessAddedBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessAddedBook
);

export const errorsAddBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.errorsAddedBook
);
