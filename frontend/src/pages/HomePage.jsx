import { useEffect } from "react";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";

import { AddProductModal, ProductCard } from "../components";
import { useProductStore } from "../stores";

const HomePage = () => {
    const { products, getProducts, isLoading } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                {/* L */}
                <button
                    className="btn btn-primary"
                    onClick={() => { }}
                >
                    <PlusCircleIcon className="size-5 mr-2" />
                    Add Product
                </button>

                {/* R */}
                <button
                    className="btn btn-ghost btn-circle"
                    onClick={getProducts}
                >
                    <RefreshCwIcon className="size-5" />
                </button>
            </div>

            {!products.length && !isLoading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <div className="bg-base-100 rounded-full p-6">
                        <PackageIcon className="size-12" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold">No products available</h3>
                        <p className="text-gray-500 max-w-sm">Get started by adding products to the inventory</p>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}

export default HomePage;