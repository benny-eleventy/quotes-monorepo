import { createContext, Context } from "react";
import axios, { AxiosInstance } from "axios";

const ApiContext: Context<AxiosInstance> = createContext(axios.create());

export { ApiContext };
