import axios from "./axios";

export const getNotificationApi = () => axios.get("/notification");

export const deleteNotificationApi = (id: number) =>
  axios.delete(`/notification/${id}`);
