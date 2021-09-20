import { Socket } from "socket.io-client";

export interface UserI {
  id: number;
  email: string;
  fullName: string;
  dob: string;
}

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

export interface EditBookI {
  description: string;
  price: number;
  snippet: string;
  bookId: number;
}

export interface ReplyI {
  id?: number | string;
  reviewId: number;
  text: string;
  createdAt?: string;
  user?: UserI;
  targetUserId?: number;
  bookId: number;
}

export interface ReviewI {
  text?: string;
  id?: number | string;
  user?: UserI | null;
  targetUserId?: number | null;
  targetUserName?: string | null;
  createdAt: string;
  bookId: number | string;
  replies?: ReplyI[];
}

export interface InitialStateSignI {
  status: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: unknown;
}

export interface InitialValuesAddBookI {
  title: string;
  author: string;
  description: string;
  price: number;
  snippet?: string;
  creatorId: number | null;
  rating: number;
  category: string;
  file?: File | null;
  image: string;
}

export interface AddCategoryI {
  category: string;
}

export interface AddReviewI {
  id?: number;
  text: string;
  bookId: number | string;
  userId: number | null;
  createdAt: string;
}

export interface AddFavI {
  bookId: number | null;
}

export interface TargetUserI {
  id?: number | null;
  fullName?: string | null;
  reviewId?: number;
}

export interface LoginFormValuesI {
  email: string;
  password: string;
}

export interface RatingI {
  value: number;
  bookId: number;
}

export interface SearchI {
  author?: string;
  price?: number[] | string;
  rating?: string;
  category?: string | number;
  order?: string;
  page?: number;
}

export interface SocketI {
  socket: Socket | null;
}

export interface SignUpFormValuesI {
  fullName: string;
  email: string;
  password: string;
  dob: string;
}
