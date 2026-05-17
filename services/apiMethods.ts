import axiosInstance from "@/lib/axios";

export const apiGet = async (url: string, params = {}) => {
  const response = await axiosInstance.get(url, { params });
  return response.data;
};

export const apiPost = async (url: string, data = {}) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const apiPut = async (url: string, data = {}) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

export const apiPatch = async (url: string, data = {}) => {
  const response = await axiosInstance.patch(url, data);
  return response.data;
};


export const apiDelete = async (url: string) => {
  const response = await axiosInstance.delete(url);
  return response.data;
};