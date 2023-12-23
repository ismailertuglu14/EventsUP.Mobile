import BaseResponse from "../../../../core/network/base_response";
import axiosInstance from "../../../../core/network/network_manager";
import NetworkManager from "../../../../core/network/network_manager";
import { toQUeryString } from "../../../../features/helpers/network_helper";
import { CommentModel } from "../models/comment_model";

export const savePost = async (id: string) => {
    try {
        const response = await axiosInstance.post(`/post/save/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }    
};

export const getPostComments = async (id: string, skip: number, take: number) => {
    try {
        const response = await axiosInstance.get(`/post/${id}/comments${toQUeryString({skip, take})}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }    

}

export const getPostById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/post/GetPost${toQUeryString({id})}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}

export const createComment = async (postId: string, message: string, parentCommentId?: string,): Promise<BaseResponse<CommentModel>> => {
    try{
        var response = await axiosInstance.post(`post/comment`, {
            postId,
            parentCommentId,
            message
        })
        return response.data;
    }catch(error){
        throw error;
    }
}