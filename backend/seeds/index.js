import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
    {
        "name": "Dunu Koto Ito",
        "image": "https://cdn.shopify.com/s/files/1/0031/0453/8673/files/3_2d933103-da2b-49b5-8501-ce38f8832740.jpg?v=1755269074",
        "price": 5490000
    },
    {
        "name": "Dunu Vulkan 2",
        "image": "https://av1group.com.sg/cdn/shop/files/DUNUVulkan2-1_2000x.jpg?v=1761115717",
        "price": 9490000
    },
    {
        "name": "Moondrop Blessing 3",
        "image": "https://everydaylistening.net/wp-content/uploads/2023/11/dsc05128.jpg?w=1200&h=660&crop=1",
        "price": 6290000
    },
    {
        "name": "Moondrop Starfield",
        "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihyphenhyphenQlUUJlrw8B0_H5noQjuvdQRhOvRjwQgEpcmJ6fFveROlshfggT0PqFh2i_gvuYsCTbx-mfmQMhtfAm2lPjJJSeYtQo8HMz9JvITMNqox1b1KNak-rw9tBIjSNvxb0N-K4rwJ2zgaZ4/s1600/DSC_1553.JPG",
        "price": 2290000
    },
    {
        "name": "Moondrop Aria 2",
        "image": "https://hifigo.com/cdn/shop/files/moondrop-aria-2-aria2-full-field-hi-fi-patent-dynamic-driver-in-ear-monitors-hifigo-264702.jpg?v=1745382395&width=1000",
        "price": 1890000
    },
    {
        "name": "Moondrop Meteor",
        "image": "https://www.stereoindex.com/wp-content/uploads/2024/12/Moondrop-Meteor-1024x576.jpg",
        "price": 11950000
    },
];

async function seedDB() {
    try {
        await sql`DROP TABLE IF EXISTS products CASCADE`;

        await sql`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

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

seedDB(); // -> npm run seed