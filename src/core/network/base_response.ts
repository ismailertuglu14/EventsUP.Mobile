type BaseResponse<T> = {
    data: T,
    statusCode: number,
    isSuccess: boolean,
    errors: string[],
}
export default BaseResponse;