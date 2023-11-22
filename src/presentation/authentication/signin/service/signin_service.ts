import axios, { Axios, AxiosError } from "axios";
import NetworkManager from "../../../../core/network/network_manager";
import axiosInstance from "../../../../core/network/network_manager";

export const login = async (username: string, password: string) => {
   try {
    // truest untrusted certificate write this code
    const response = await axiosInstance.post("/authentication/signin",{username,password})
    return response.data;
   }catch (error: AxiosError | any) {
    if (error.response) {
      console.log("Server error response data:", error.response.data);
    } else {
      console.log("Client-side error:", error.message);
    }
    throw error;
  }
};
