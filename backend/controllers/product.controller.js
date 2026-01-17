import { sql } from "../config/db.js";
import { asyncHandler } from "../lib/async.handler.js";

export const getProducts = asyncHandler(async (_, res) => {
    const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
    `;

    return res.status(200).json({ data: products });
});

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await sql`
        SELECT * FROM products
        WHERE id=${id}
    `;

    if (!product.length) {
        return res.status(404).json({ message: "Product not found" })
    }

    return res.status(200).json({ data: product[0] });
});

export const createProduct = asyncHandler(async (req, res) => {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
        return res.status(400).json({ message: "All fields is required" });
    }

    const newProduct = await sql`
        INSERT INTO products (name, image, price)
        VALUES (${name}, ${image}, ${price})
        RETURNING *
    `;

    return res.status(201).json({ data: newProduct[0] });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, image, price } = req.body;
    const { id } = req.params;

    if (!name || !image || !price) {
        return res.status(400).json({ message: "All fields is required" });
    }

    const updatedProduct = await sql`
        UPDATE products
        SET name=${name}, image=${image}, price=${price}, updated_at=CURRENT_TIMESTAMP
        WHERE id=${id}
        RETURNING *
    `;

    if (!updatedProduct.length) {
        return res.status(404).json({ message: "Product not found" })
    }

    return res.status(200).json({ data: updatedProduct[0] });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await sql`
        DELETE FROM products
        WHERE id=${id}
        RETURNING *
    `;

    if (!deletedProduct.length) {
        return res.status(404).json({ message: "Product not found" })
    }

    return res.status(200).json({ data: deletedProduct[0] });
});