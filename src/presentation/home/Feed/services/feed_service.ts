import { AxiosError } from "axios";
import { TAKE } from "../../../../core/network/network_constants";
import { toQUeryString } from "../../../../features/helpers/network_helper";
import axiosInstance from "../../../../core/network/network_manager";
import { PostModel } from "../models/post_model";
import CacheManager from "../../../../core/cache/cache_manager";

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

export const cacheFeed = async (posts: PostModel[]) => {
  // cache to locale storage
  const cache = CacheManager.getInstance();
  await cache.set("feed", posts);
};

export const getCachedFeed = async () => {
  const cache = CacheManager.getInstance();
  await cache.load();
  return await cache.get("feed");
};