import axiosInstance from "../../../../core/network/network_manager";
import NetworkManager from "../../../../core/network/network_manager";

export const savePost = async (id: string) => {
    try {
        const response = await axiosInstance.post(`/post/save/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }    
};