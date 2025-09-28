import slug from 'slug'
import { MongoClient } from 'mongodb';
import {DATABASE_CONN} from "../settings/config.js";

/**
 * Database: eshopping
 * Collection: categories
 *
 * This script defines the default set of categories for the blog.
 * Each category includes:
 *  - name: A human-readable brand name.
 * These categories can be used to organize blog posts and improve content navigation.
 */
const dbName = "eshopping";
const collectionName = "categories";

const categories = ["Electronics", "Home Appliances", "Sports", "Fashion", "Beauty & Personal Care",
    "Automotive", "Books", "Toys & Games", "Health & Wellness", "Furniture", "Groceries", "Jewelry", "Shoes",
    "Watches", "Musical Instruments", "Office Supplies", "Garden & Outdoor", "Pet Supplies", "Baby Products",
    "Travel & Luggage"];

 /**
 * Inserts multiple brands documents into a MongoDB collection.
 *
 * This function establishes a connection to the MongoDB database,
 * selects the specified collection, and inserts an array of
 * documents (categories). After the operation, it logs the number
 * of documents successfully inserted. The client connection is
 * closed in the `finally` block to ensure proper resource cleanup.
 *
 * Error handling is included to catch and log any issues that may
 * occur during the connection or insertion process.
 */

async function run() {
    const client = new MongoClient(DATABASE_CONN);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        for (let i = 0; i < categories.length; i++) {
            await collection.insertOne({
                name: categories[i],
                slug: slug(categories[i]),
                logo: "https://avatars.githubusercontent.com/u/97165289"
            });
        }
        console.log(`Category name inserted.`);
    } catch (err) {
        console.error("Error inserting documents:", err);
    } finally {
        await client.close();
    }
}

run();
