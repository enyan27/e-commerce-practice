import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const useProductStore = create((set, get) => {
    // this helps reduce try-catch repetition
    const asyncHandler = (fn) => async (...args) => {
        const prev = get().products;
        try {
            return await fn(...args);
        } catch (error) {
            setInterval(() => { set({ products: prev }) }, 500); // rollback
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    };

    return {
        products: [],
        isLoading: true,
        formData: {
            name: "",
            image: "",
            price: ""
        },
        setFormData: (data) => set({ formData: data }),
        resetFormData: () => set({ formData: { name: "", image: "", price: "" } }),

        getProducts: asyncHandler(async () => {
            const res = await axiosInstance.get("/products");
            set({ products: res.data.data });
        }),
        /**
         * we will update ui immediately
         * while server processes the request
         * if successful, replace the optimistic data with response data
         * if it fails, rollback to previous state
         */
        createProduct: asyncHandler(async (data) => {
            const optimistic = { id: `temp-${Date.now()}`, ...data };
            set(state => ({ products: [optimistic, ...state.products] }));

            const res = await axiosInstance.post("/products", data);
            set(state => ({
                products: state.products.map(item => item.id === optimistic.id ? res.data.data : item)
            }));
            toast.success("Created successfully");
        }),
        deleteProduct: asyncHandler(async (id) => {
            set(state => ({
                products: state.products.filter(item => item.id !== id)
            }));
            await axiosInstance.delete(`/products/${id}`);
            toast.success("Deleted successfully");
        }),
    }
});

export default useProductStore;