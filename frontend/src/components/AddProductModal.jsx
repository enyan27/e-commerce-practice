import { CircleDollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../stores";

const AddProductModal = () => {
    const { formData, setFormData, resetFormData, createProduct, isLoading } = useProductStore();

    const onSubmit = (e) => {
        e.preventDefault();
        createProduct(formData);
        resetFormData();
        document.getElementById("add_product_modal").close();
    }

    return (
        <>
            {/* https://v4.daisyui.com/components/modal */}
            <dialog id="add_product_modal" className="modal">
                <div className="modal-box">
                    {/* CLOSE BUTTON */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {/* MODAL HEADER */}
                    <h3 className="font-bold text-xl mb-8">Add New Product</h3>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid gap-6">
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
                        </div>

                        {/* MODAL ACTIONS */}
                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!formData.name || !formData.image || !formData.price || isLoading}
                            >
                                <PlusCircleIcon className="size-5" />
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>

                {/* BACKDROP */}
                <form method="dialog" className="modal-backdrop">
                    <button />
                </form>
            </dialog>
        </>
    );
}

export default AddProductModal;