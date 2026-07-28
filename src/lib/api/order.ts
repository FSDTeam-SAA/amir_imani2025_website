import axiosInstance from "./axios-instance";

export async function orderHistory(userId: string) {
    try {
      const res = await axiosInstance.get(`/orders/user/${userId}`);
      return res.data;
    } catch (error) {
        if(error instanceof Error){

            throw new Error( error.message || 'Failed to fetch order history');
        }
    }
}
