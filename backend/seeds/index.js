import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
    {
        "name": "Dunu Koto Ito",
        "image": "https://cdn.shopify.com/s/files/1/0031/0453/8673/files/3_2d933103-da2b-49b5-8501-ce38f8832740.jpg?v=1755269074",
        "price": 5750000
    },
    {
        "name": "Dunu Vulkan 2",
        "image": "https://av1group.com.sg/cdn/shop/files/DUNUVulkan2-1_2000x.jpg?v=1761115717",
        "price": 9450000
    },
    {
        "name": "Moondrop Blessing 3",
        "image": "https://everydaylistening.net/wp-content/uploads/2023/11/dsc05128.jpg?w=1200&h=660&crop=1",
        "price": 6500000
    },
];

async function seedDB() {
    try {
        // clear existing data
        await sql`
            TRUNCATE TABLE products
            RESTART IDENTITY CASCADE
        `;

        // insert all samples
        for (const item of SAMPLE_PRODUCTS) {
            await sql`
                INSERT INTO products (name, image, price)
                VALUES (${item.name}, ${item.image}, ${item.price})
            `;
        }

        console.log("Database seeded successfully");
        process.exit(0); // success code
    } catch (error) {
        console.error("Error in seedDB:", error);
        process.exit(1); // failure code
    }
}

seedDB(); // use 'npm run seed' to execute this file