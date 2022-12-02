import { useQuery } from "react-query";
import { api } from "../config/axios";

const getListSample = () => api.get("/posts");

export const useListSample = () => {
  return useQuery("list-sample", getListSample);
};
