import BaseResponse from "../../../../core/network/base_response";
import axiosInstance from "../../../../core/network/network_manager";
import { toQUeryString } from "../../../../features/helpers/network_helper";
import { User } from "../models/User";


export const getProfileInfo = async (id: string) => {
   try {
    const response = await axiosInstance.get(`/user/GetUserById?userid=${id}`);
    return response.data as BaseResponse<User>;
   } catch (error) {
    console.log(error)
   }
}

export const getUserPosts = async (id: string) => {
   try {
      const response = await axiosInstance.get(`/post/user/${id}`)
      return response.data;
   } catch (error) {
         console.log("error: ",error)
   }
} 


export const followUser = async (id: string) => {
   try {
      const response = await axiosInstance.post(`/user/follow`,{"targetId":id})
      return response.data;
   } catch (error) {
      console.log(error)
   }
}
export const getFollowings = async (id: string, text?: string, skip: number = 0, take: number = 10) => {
   try {
      const query = toQUeryString({
         query: text || "",
         skip,
         take
      })
      console.log(query)
      const response = await axiosInstance.get(`/user/${id}/followings${query}`)
      return response.data;
   } catch (error) {
      console.log(error)
   }
}
export const getFollowers = async (id: string, text?: string, skip: number = 0, take: number = 10) => {
   try {
      const query = toQUeryString({
         query: text || "",
         skip,
         take
      })
      const response = await axiosInstance.get(`/user/${id}/followers${query}`)
      return response.data;
   } catch (error) {
      console.log(error)
   }
}