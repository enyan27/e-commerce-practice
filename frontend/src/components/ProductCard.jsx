import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useProductStore } from "../stores";

const ProductCard = ({ product }) => {
    const { deleteProduct } = useProductStore();

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {/* PRODUCT IMAGE */}
            <figure className="relative pt-[56.25%]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 size-full object-cover"
                />
            </figure>

            <div className="card-body">
                {/* PRODUCT INFO */}
                <h2 className="card-title text-2xl font-bold">{product.name}</h2>
                <p className="text-xl font-bold text-primary">
                    {new Intl.NumberFormat("vi-VN",
                        { style: "currency", currency: "VND" }
                    ).format(product.price)}
                </p>

                {/* CARD ACTIONS */}
                <div className="card-actions justify-end mt-4">
                    <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
                        <EditIcon className="size-4" />
                    </Link>

                    <button
                        className="btn btn-sm btn-error btn-outline"
                        onClick={() => deleteProduct(product.id)}
                    >
                        <Trash2Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;