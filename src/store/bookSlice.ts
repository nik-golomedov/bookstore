import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { RootState } from ".";
import {
  addBookApi,
  addCategoryApi,
  addFavouritesApi,
  addRatingApi,
  addReplyApi,
  addReviewApi,
  deleteFavouritesApi,
  editBookApi,
  getBookApi,
  getBooksApi,
  getCategoryApi,
  getFavouritesApi,
  getReviewApi,
} from "../api/book";
import {
  AddCategoryI,
  AddFavI,
  AddReviewI,
  BookI,
  CategoryI,
  EditBookI,
  InitialValuesAddBookI,
  RatingI,
  ReplyI,
  ReviewI,
  SearchI,
} from "../interfaces";

interface DataI {
  books: Array<BookI>;
  total: number;
}

interface FavouritesI {
  books: BookI[];
}

interface InitialStateBooksI {
  fav: FavouritesI;
  data: DataI;
  singleBook: BookI;
  review: Array<ReviewI>;
  filter: SearchI;
  category: Array<CategoryI>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isSuccessAddedBook: boolean;
  isErrorAddedBook: boolean;
  isSuccessFavourite: boolean;
  isSuccessAddedReply:boolean;
  isSuccessAddedReview:boolean;
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
  async (formValues: InitialValuesAddBookI, thunkAPI) => {
    try {
      const formData = new FormData();
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
      const response = await addBookApi(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async ({ newFilterSearch }: { newFilterSearch: SearchI }, thunkAPI) => {
    try {
      const response = await getBooksApi({ newFilterSearch });
      return response && (response.data as DataI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (id: number, thunkAPI) => {
    try {
      const response = await getBookApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addReview = createAsyncThunk(
  "book/addReview",
  async (value: AddReviewI, thunkAPI) => {
    try {
      const response = await addReviewApi(value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addReply = createAsyncThunk(
  "book/addReply",
  async (value: ReplyI, thunkAPI) => {
    try {
      const response = await addReplyApi(value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getReview = createAsyncThunk(
  "book/getReview",
  async (id: number, thunkAPI) => {
    try {
      const response = await getReviewApi(id);
      return response.data as ReviewI[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addFavourites = createAsyncThunk(
  "book/addFavourites",
  async ({ bookId }: AddFavI, thunkAPI) => {
    try {
      const response = await addFavouritesApi({ bookId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getFavourites = createAsyncThunk(
  "book/getFavourites",
  async (_, thunkAPI) => {
    try {
      const response = await getFavouritesApi();
      return response.data as FavouritesI;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteFavourites = createAsyncThunk(
  "book/deleteFavourites",
  async ({ bookId }: AddFavI, thunkAPI) => {
    try {
      const response = await deleteFavouritesApi({ bookId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addRating = createAsyncThunk(
  "book/addRating",
  async ({ value, bookId }: RatingI, thunkAPI) => {
    try {
      const response = await addRatingApi({ value, bookId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addCategory = createAsyncThunk(
  "book/addCategory",
  async (value: AddCategoryI, thunkAPI) => {
    try {
      const response = await addCategoryApi(value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCategory = createAsyncThunk(
  "book/getCategory",
  async (_, thunkAPI) => {
    try {
      const response = await getCategoryApi();
      return response.data as CategoryI[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editBook = createAsyncThunk(
  "book/editBook",
  async (value: EditBookI, thunkAPI) => {
    try {
      const response = await editBookApi(value);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState: InitialStateBooksI = {
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
  isFetching: false,
  isSuccess: false,
  isSuccessRating: false,
  isSuccessFavourite: false,
  isSuccessAddedBook: false,
  isErrorAddedBook: false,
  isSuccessDeleteFavourite: false,
  isSuccessEdit: false,
  isSuccessAddedReply: false,
  isSuccessAddedReview: false,
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
    addFilterParams(state, action: PayloadAction<SearchI>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearAddBookRequest(state) {
      state.isSuccessAddedBook = false;
      state.isErrorAddedBook = false;
      state.errorsAddedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state) => {
      state.isSuccessAddedBook = false;
      state.isErrorAddedBook = false;
    });
    builder.addCase(addBook.fulfilled, (state) => {
      state.isSuccessAddedBook = true;
      state.isErrorAddedBook = false;
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.isSuccessAddedBook = false;
      state.isErrorAddedBook = true;
      state.errorsAddedBook = action.payload;
    });
    builder.addCase(getBooks.pending, (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.data = action.payload!;
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(getBook.pending, (state) => {
      state.isSuccessBook = false;
      state.isErrorBook = false;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.singleBook = action.payload;
      state.isSuccessBook = true;
      state.isErrorBook = false;
    });
    builder.addCase(getBook.rejected, (state) => {
      state.isSuccessBook = false;
      state.isErrorBook = true;
    });
    builder.addCase(editBook.pending, (state) => {
      state.isSuccessEdit = false;
    });
    builder.addCase(editBook.fulfilled, (state) => {
      state.isSuccessEdit = true;
    });
    builder.addCase(editBook.rejected, (state) => {
      state.isSuccessEdit = false;
    });
    builder.addCase(addFavourites.pending, (state) => {
      state.isSuccessFavourite = false;
    });
    builder.addCase(addFavourites.fulfilled, (state) => {
      state.isSuccessFavourite = true;
    });
    builder.addCase(addFavourites.rejected, (state) => {
      state.isSuccessFavourite = false;
    });
    builder.addCase(deleteFavourites.pending, (state) => {
      state.isSuccessDeleteFavourite = false;
    });
    builder.addCase(deleteFavourites.fulfilled, (state) => {
      state.isSuccessDeleteFavourite = true;
    });
    builder.addCase(deleteFavourites.rejected, (state) => {
      state.isSuccessDeleteFavourite = false;
    });
    builder.addCase(getReview.fulfilled, (state, action) => {
      state.review = action.payload!;
    });
    builder.addCase(addReview.pending, (state) => {
      state.isSuccessAddedReview = false;
    });
    builder.addCase(addReview.fulfilled, (state) => {
      state.isSuccessAddedReview = true;
    });
    builder.addCase(addReview.rejected, (state) => {
      state.isSuccessAddedReview = false;
    });
    builder.addCase(addReply.pending, (state) => {
      state.isSuccessAddedReply = false;
    });
    builder.addCase(addReply.fulfilled, (state) => {
      state.isSuccessAddedReply = true;
    });
    builder.addCase(addReply.rejected, (state) => {
      state.isSuccessAddedReply = false;
    });
    builder.addCase(addRating.pending, (state) => {
      state.isSuccessRating = false;
    });
    builder.addCase(addRating.fulfilled, (state) => {
      state.isSuccessRating = true;
    });
    builder.addCase(getFavourites.fulfilled, (state, action) => {
      state.fav = action.payload!;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload!;
    });
  },
});

export default booksSlice.reducer;

export const {
  addFilterParams,
  clearAddBookRequest,
} = booksSlice.actions;

const allBooks = (state: RootState) => state.books;

export const bookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.data && state.data.books,
);

export const totalSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.data && state.data.total,
);

export const filterSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.filter,
);

export const categorySelector = createDraftSafeSelector(
  allBooks,
  (state) => state && state.category,
);

export const isFetchingBooksSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isFetching,
);

export const favListSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.fav && state.fav.books,
);

export const reviewSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.review,
);

export const singleBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.singleBook,
);

export const isSuccessEditSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessEdit,
);

export const isSuccessRatingSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessRating,
);

export const isErrorBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isErrorBook,
);

export const isSuccessFavouriteSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessFavourite,
);

export const isSuccessDeleteFavouriteSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessDeleteFavourite,
);

export const isSuccessAddedBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessAddedBook,
);

export const isSuccessAddedReplySelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessAddedReply,
);

export const isSuccessAddedReviewSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.isSuccessAddedReview,
);

export const errorsAddBookSelector = createDraftSafeSelector(
  allBooks,
  (state) => state.errorsAddedBook,
);

export const isFavouriteSelector = (id: number) => createDraftSafeSelector(
  allBooks,
  (state: InitialStateBooksI) => state.fav.books.filter((item) => item.id === +id),
);
