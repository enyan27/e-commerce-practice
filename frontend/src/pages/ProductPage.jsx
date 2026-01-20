import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, CircleDollarSignIcon, ImageIcon, Package2Icon, SaveIcon, Trash2Icon } from "lucide-react";
import { useProductStore } from "../stores";

const ProductPage = () => {
    const { formData, setFormData, getProductById, updateProduct, isLoading } = useProductStore();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id);
    }, [getProductById, id]);

    const onSubmit = (e) => {
        e.preventDefault();
        updateProduct(id, formData);
        navigate("/");
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-dots loading-lg" />
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <button className="btn btn-ghost" onClick={() => navigate("/")}>
                    <ArrowLeftIcon className="size-4" />
                    Back to Products
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* PRODUCT IMAGE */}
                    <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
                        <img
                            src={formData.image}
                            alt={formData.name}
                            className="size-full object-cover"
                        />
                    </div>

                    {/* PRODUCT FORM */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

                            <form onSubmit={onSubmit} className="space-y-6">
                                {/* PRODUCT NAME INPUT */}
                                {/* https://v4.daisyui.com/components/input */}
                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text font-medium text-base">Product Name</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <Package2Icon className="size-5" />
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="Enter product name..."
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </label>
                                </div>

                                {/* IMAGE URL INPUT */}
                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text font-medium text-base">Image URL</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <ImageIcon className="size-5" />
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="https://example.com/image.jpg"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                    </label>
                                </div>

                                {/* PRICE INPUT */}
                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text font-medium text-base">Price</span>
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <CircleDollarSignIcon className="size-5" />
                                        <input
                                            type="number"
                                            min={0}
                                            className="grow"
                                            placeholder="0"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        />
                                    </label>
                                </div>

                                {/* MODAL ACTIONS */}
                                <div className="modal-action">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!formData.name || !formData.image || !formData.price || isLoading}
                                    >
                                        <SaveIcon className="size-5" />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPage;