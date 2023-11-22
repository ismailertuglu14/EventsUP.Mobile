import { AxiosError } from "axios";
import { TAKE } from "../../../../core/network/network_constants";
import NetworkManager from "../../../../core/network/network_manager";
import { toQUeryString } from "../../../../features/helpers/network_helper";
import axiosInstance from "../../../../core/network/network_manager";

export const fetchFeed = async (page: number) => {
    try{
        const response = await axiosInstance.get(`/post/feed/${toQUeryString({skip:page, take: TAKE})}`);
         return response.data;
    }catch(error: AxiosError | any){
        if (error.response) {
            console.log("Server error response data:", error.response.data);
          } else {
            console.log("Client-side error:", error.message);
          }
          throw error;
    }
};