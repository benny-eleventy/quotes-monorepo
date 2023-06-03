import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export const createApi = (config: AxiosRequestConfig): AxiosInstance => {
	return axios.create(config);
};
