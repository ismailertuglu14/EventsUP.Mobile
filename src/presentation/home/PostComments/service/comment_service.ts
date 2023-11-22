import BaseResponse from "../../../../core/network/base_response";
import axiosInstance from "../../../../core/network/network_manager";
import { toQUeryString } from "../../../../features/helpers/network_helper";
import { CommentModel } from "../model/comment_model";

export const getComments = async (postId: string, skip = 0, take = 10): Promise<BaseResponse<CommentModel[]>> => {
    try{
        var response = await axiosInstance.get(`post/${postId}/comments${toQUeryString({skip, take})}`)
        return response.data;
    }catch(error){
        throw error;
    }
};

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