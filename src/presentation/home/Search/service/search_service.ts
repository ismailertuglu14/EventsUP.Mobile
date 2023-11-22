import axiosInstance from "../../../../core/network/network_manager"

export const searchByQueryText = async (queryText: string) => {
    const response = await axiosInstance.get(`/user/Search?text=${queryText}`)
    return response.data
}

export const getUserById = async (userId: string) => {
    const response = await axiosInstance.get(`/user/getUserById?userid=${userId}`)
    return response.data
}