import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const useProductStore = create((set) => ({
    products: [],
    isLoading: false,

    getProducts: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/products");
            set({ products: res.data.data });
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },
    getProductById: async (id) => { },
    createProduct: async (data) => { },
    updateProduct: async (id, data) => { },
    deleteProduct: async (id) => { },
}));

export default useProductStore;